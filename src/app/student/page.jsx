"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Header from "./header";
import Sidebar from "./sidebar";
import SurveyComponent from "./Component/SurveyComponent";
import { toast } from "react-toastify";

export default function Student() {
  const [user, loading] = useAuthState(auth);
  const [surveys, setSurveys] = useState([]);
  const [currentSurvey, setCurrentSurvey] = useState(null);
  const router = useRouter();
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

    const surveysRef = collection(db, "studentsurveys");
    const q = query(
      surveysRef,
      where("studentId", "==", user.uid),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const surveysData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSurveys(surveysData);
      setCurrentSurvey(surveysData.length > 0 ? surveysData[0] : null);
    });

    return () => unsubscribe();
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 sm:ml-64">
          <div className="container mx-auto px-4">
            <Typography variant="h4" color="blue-gray" className="mb-4">
              Your Surveys
            </Typography>
            {currentSurvey ? (
              <SurveyComponent />
            ) : (
              <Card className="w-full">
                <CardBody className="flex flex-col items-center justify-center p-8">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    No Surveys Available
                  </Typography>
                  <Typography color="gray" className="text-center">
                    You currently have no surveys to complete. Check back later
                    for new surveys.
                  </Typography>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
        <Dialog
          open={showTimeoutDialog}
          handler={() => {}}
          className="min-w-[350px]"
        >
          <DialogHeader>Session Timeout</DialogHeader>
          <DialogBody>
            Your session has expired due to inactivity. You will be redirected
            to the login page.
          </DialogBody>
          <DialogFooter>
            <Button onClick={handleTimeout} color="green">
              Okay
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
