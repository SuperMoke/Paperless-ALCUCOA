"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/app/firebase";
import Header from "../header";
import Sidebar from "../sidebar";
import { EyeIcon, BellIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { isAuthenticated } from "../../utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminNotifications() {
  const [files, setFiles] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false);
  const TIMEOUT_DURATION = 600000;

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("User is not authenticated, redirecting to home...");
      router.push("/");
      return;
    }
    const checkAuth = async () => {
      console.log("Checking authentication...");
      const authorized = await isAuthenticated("admin");
      if (authorized) {
        console.log("User is authorized as admin");
        setIsAuthorized(true);
      } else {
        console.log("User is not authorized, redirecting to home...");
        router.push("/");
      }
    };
    checkAuth();
  }, [user, loading, router]);

  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    // Check for inactivity
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity >= TIMEOUT_DURATION) {
        setShowTimeoutDialog(true);
      }
    }, 60000); // Check every minute

    return () => {
      // Cleanup
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
      clearInterval(interval);
    };
  }, [lastActivity]);

  const handleTimeout = () => {
    auth.signOut();
    setShowTimeoutDialog(false);
    router.push("/");
  };

  const handleMarkAsRead = async (fileId) => {
    try {
      const fileRef = doc(db, "faculty_files", fileId);
      await updateDoc(fileRef, {
        isRead: true,
      });
      toast.success("Marked as read");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark as read");
    }
  };

  useEffect(() => {
    const fetchFiles = () => {
      const filesRef = collection(db, "faculty_files");
      const filesQuery = query(filesRef, orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(filesQuery, (snapshot) => {
        const filesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          isRead: doc.data().isRead || false,
          ...doc.data(),
        }));
        setFiles(filesData);
      });
      return unsubscribe;
    };

    const unsubscribeFiles = fetchFiles();

    return () => {
      unsubscribeFiles();
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const Notifications = ({ files }) => (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">Notifications</Typography>
        <IconButton
          variant="text"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeSlashIcon className="h-5 w-5" />
          )}
        </IconButton>
      </div>
      {isVisible &&
        files.map((file) => (
          <div
            key={file.id}
            className="mb-4 flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
            onClick={() => handleMarkAsRead(file.id)}
          >
            <BellIcon
              className={`h-5 w-5 mr-2 ${
                file.isRead ? "text-gray-400" : "text-blue-500"
              }`}
            />
            <div>
              <Typography
                variant="small"
                className={file.isRead ? "text-gray-500" : "font-bold"}
              >
                {file.user_name} uploaded a file under {file.category}
              </Typography>
              <Typography variant="small" color="gray">
                {formatDate(file.timestamp.toDate())}
              </Typography>
            </div>
          </div>
        ))}
    </Card>
  );

  return isAuthorized ? (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 sm:ml-64">
          <div className="container mx-auto">
            <Typography variant="h2" className="mb-4 text-center">
              Admin Notifications
            </Typography>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              <Notifications files={files} />
            </main>
          </div>
        </div>
      </div>
      <Dialog
        open={showTimeoutDialog}
        handler={() => {}}
        className="min-w-[350px]"
      >
        <DialogHeader>Session Timeout</DialogHeader>
        <DialogBody>
          Your session has expired due to inactivity. You will be redirected to
          the login page.
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleTimeout} color="green">
            Okay
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  ) : null;
}
