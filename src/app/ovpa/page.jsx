"use client";

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import {
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";
import { db, auth } from "@/app/firebase";
import Header from "./header";
import Sidebar from "./sidebar";
import {
  PencilIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  CheckIcon,
  EyeIcon,
  TrashIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { isAuthenticated } from "../utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const BulletinBoard = ({
  announcements,
  newAnnouncement,
  setNewAnnouncement,
  handlePostAnnouncement,
  editingId,
  setEditingId,
  editContent,
  setEditContent,
  handleEditAnnouncement,
  handleDeleteAnnouncement,
  formatDate,
  currentUserEmail, // Add this prop
}) => {
  const textareaRef = useRef(null); // Ref for textarea

  // Function to keep focus in textarea
  const handleTextareaFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <Card className="p-4">
      <Typography variant="h6" className="mb-4">
        Bulletin Board
      </Typography>
      <div className="mb-4 w-full">
        <Textarea
          ref={textareaRef}
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          label="Announcement"
          onFocus={handleTextareaFocus} // Ensure it stays focused
          rows={8}
        />
        <Button color="green" className="mt-2" onClick={handlePostAnnouncement}>
          Post Announcement
        </Button>
      </div>
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="mb-4 p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div>
                <Typography variant="h6">{announcement.postedBy}</Typography>
                {editingId === announcement.id ? (
                  <div className="w-[32rem] ">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      ref={textareaRef}
                      onFocus={handleTextareaFocus}
                      rows={8}
                    />
                  </div>
                ) : (
                  <Typography variant="small" className="mb-2">
                    {announcement.content}
                  </Typography>
                )}
                <Typography variant="small" color="gray">
                  {formatDate(announcement.timestamp.toDate())}
                  {announcement.edited && " (edited)"}
                </Typography>
              </div>
            </div>
            <div className="flex">
              {editingId === announcement.id ? (
                <>
                  <IconButton
                    variant="text"
                    size="sm"
                    onClick={() =>
                      handleEditAnnouncement(announcement.id, editContent)
                    }
                  >
                    <CheckIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    variant="text"
                    size="sm"
                    onClick={() => setEditingId(null)}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </IconButton>
                </>
              ) : (
                <>
                  {currentUserEmail === announcement.email && ( // Conditional rendering
                    <IconButton
                      variant="text"
                      size="sm"
                      onClick={() => {
                        setEditingId(announcement.id);
                        setEditContent(announcement.content);
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  )}
                  {currentUserEmail === announcement.email && ( // Conditional rendering
                    <IconButton
                      variant="text"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </Card>
  );
};

export default function OVPA() {
  const [files, setFiles] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("User is not authenticated, redirecting to home...");
      router.push("/");
      return;
    }
    const checkAuth = async () => {
      console.log("Checking authentication...");
      const roleMap = {
        ovpa: true,
        faculty: true,
        admin: true,
      };
      for (const role of Object.keys(roleMap)) {
        const authorized = await isAuthenticated(role);
        if (authorized) {
          console.log("User is authorized:", role);
          setIsAuthorized(true);
          return;
        }
      }
      console.log("User is not authorized, redirecting to home...");
      router.push("/");
    };
    checkAuth();
  }, [user, loading, router]);

  useEffect(() => {
    const fetchFiles = () => {
      const filesRef = collection(db, "faculty_files");
      const filesQuery = query(
        filesRef,
        orderBy("timestamp", "desc"),
        limit(10)
      );
      const unsubscribe = onSnapshot(filesQuery, (snapshot) => {
        const filesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(filesData);
      });
      return unsubscribe;
    };

    const fetchAnnouncements = () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const announcementsQuery = query(
        collection(db, "announcements"),
        where("timestamp", ">=", threeDaysAgo),
        orderBy("timestamp", "desc")
      );

      const unsubscribe = onSnapshot(announcementsQuery, (snapshot) => {
        const fetchedAnnouncements = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnouncements(fetchedAnnouncements);
      });

      return unsubscribe;
    };

    const unsubscribeFiles = fetchFiles();
    const unsubscribeAnnouncements = fetchAnnouncements();

    return () => {
      unsubscribeFiles();
      unsubscribeAnnouncements();
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.email) {
        const usersRef = collection(db, "userdata");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserProfile(querySnapshot.docs[0].data());
        }
      }
    };

    fetchUserProfile();
  }, [user]);

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

  const handlePostAnnouncement = async () => {
    if (!newAnnouncement.trim()) {
      toast.error("Announcement cannot be empty");
      return;
    }
    try {
      await addDoc(collection(db, "announcements"), {
        content: newAnnouncement,
        timestamp: serverTimestamp(),
        postedBy: userProfile.name,
        email: user.email,
        edited: false,
        editedAt: null,
      });
      setNewAnnouncement("");
      toast.success("Announcement posted successfully");
    } catch (error) {
      console.error("Error adding announcement:", error);
      toast.error("Failed to post announcement");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      toast.success("Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement");
    }
  };

  const handleEditAnnouncement = async (id, newContent) => {
    try {
      const announcementRef = doc(db, "announcements", id);
      await updateDoc(announcementRef, {
        content: newContent,
        edited: true,
        editedAt: serverTimestamp(),
      });
      setEditingId(null);
      toast.success("Announcement updated successfully");
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Failed to update announcement");
    }
  };

  const Notifications = ({ files }) => (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">Notifications</Typography>
        <Link href="/ovpa/ovpa_notifications">
          <EyeIcon className="h-5 w-5" />
        </Link>
      </div>
      {files.map((file) => (
        <div key={file.id} className="mb-4 flex items-start">
          <BellIcon className="h-5 w-5 mr-2 text-blue-500" />
          <div>
            <Typography variant="small" className="font-bold">
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
              OVPA Dashboard
            </Typography>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <BulletinBoard
                    announcements={announcements}
                    newAnnouncement={newAnnouncement}
                    setNewAnnouncement={setNewAnnouncement}
                    handlePostAnnouncement={handlePostAnnouncement}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    editContent={editContent}
                    setEditContent={setEditContent}
                    handleEditAnnouncement={handleEditAnnouncement}
                    handleDeleteAnnouncement={handleDeleteAnnouncement}
                    formatDate={formatDate}
                    currentUserEmail={user ? user.email : null}
                  />
                </div>
                <div>
                  <Notifications files={files} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
