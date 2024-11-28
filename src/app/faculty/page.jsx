"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react/components/Button";
import { db, storage, auth } from "@/app/firebase";
import {
  uploadBytesResumable,
  getMetadata,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  onSnapshot,
  orderBy,
  limit,
  getFirestore,
} from "firebase/firestore";
import { Progress, Typography } from "@material-tailwind/react";
import Card from "@material-tailwind/react/components/Card";
import CardBody from "@material-tailwind/react/components/Card/CardBody";
import Input from "@material-tailwind/react/components/Input";
import { onAuthStateChanged } from "firebase/auth";
import { Select, Option } from "@material-tailwind/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  DocumentTextIcon,
  TrashIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Header from "./header";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar";

export default function UserHomepage() {
  const [files, setFiles] = useState(Array(9).fill(null));
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userFiles, setUserFiles] = useState([]);
  const [error, setError] = useState("");
  const [folderName, setFolderName] = useState("");
  const [userid, setUserID] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [announcements, setAnnouncements] = useState([]);
  const [facultyFiles, setFacultyFiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institute, setInstitute] = useState("");
  const categories = [
    "Diploma",
    "Official Transcript of Records(TOR)",
    "Certificate of attendance to trainings or seminars",
    "Certificate of Employment of the employee from the previous employer",
    "National Certifications or Licenses and board rating",
    "Rating Form for Academic Qualification",
    "Copy of the research output or abstract",
    "Appointment papers of hired employees",
    "Certificate of participation in community involvement",
    "Vertical Articulation",
    "Membership ID/ Certificate or any evidence of active membership of professional organization",
    "Board Resolutions on rank and tenure, and others that concern the faculty",
    "Bulletins/display boards where important legislations, memoranda, directives and circulars on fringe benefits are posted",
    "Class records",
    "Class schedule for the current semester and for the two (2) preceding semesters",
    "Code of Professional Ethics/R.A. 6713 and other pertinent CSC issuances",
    "Faculty Development Program",
  ];

  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false);
  const TIMEOUT_DURATION = 600000;

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
        student: true,
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

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("timestamp", "desc"),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const announcementsList = [];
      querySnapshot.forEach((doc) => {
        announcementsList.push({ id: doc.id, ...doc.data() });
      });
      setAnnouncements(announcementsList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        setUserID(userId);
        const unsubscribeFiles = fetchUserFiles(userId);
        return () => {
          unsubscribeFiles();
        };
      } else {
        setUserID(null);
        setUserFiles([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            const userEmail = currentUser.email;
            console.log("User email:", userEmail);
            const db = getFirestore();
            const userQuery = query(
              collection(db, "userdata"),
              where("email", "==", userEmail)
            );
            const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  const userData = doc.data();
                  setName(userData.name);
                  setEmail(userData.email);

                  setInstitute(userData.institute);
                });
              } else {
                console.error("User not found or role not specified");
              }
            });
            return () => unsubscribe(); // Cleanup listener on component unmount
          }
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const fetchUserFiles = (userId) => {
    const q = query(
      collection(db, "faculty_files"),
      where("user_id", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userFilesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserFiles(userFilesData);
      console.log("Fetched user files:", userFilesData); // Add this line for debugging
    });

    return unsubscribe;
  };

  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(
          "Unsupported file type. Please select a PDF, DOC, or DOCX file."
        );
        toast.error(
          "Unsupported file type. Please select a PDF, DOC, or DOCX file."
        );
      } else {
        const newFiles = [...files];
        newFiles[index] = selectedFile;
        setFiles(newFiles);
        setError("");
      }
    }
  };

  const handleUpload = async (index) => {
    const file = files[index];
    const user = auth.currentUser;
    const user_id = user.uid;
    const user_email = user.email;

    setUserID(user_id);
    if (!file || !user) return;

    const q = query(
      collection(db, "userdata"),
      where("email", "==", user_email)
    );
    const querySnapshot = await getDocs(q);
    let userName = "";
    querySnapshot.forEach((doc) => {
      userName = doc.data().name;
    });

    const storageRef = ref(
      storage,
      `files/${user_id}/${selectedCategory}/${file.name}`
    );

    try {
      await getMetadata(storageRef);
      setError("File already exists.");
      toast.error("File already exists.");
      return;
    } catch (error) {
      setError("");
    }

    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed(0));
      },
      (error) => {
        setError("There is an error uploading the file");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);

          await addDoc(collection(db, "faculty_files"), {
            user_id: user_id,
            user_name: userName,
            name: file.name,
            url: downloadURL,
            category: selectedCategory,
            institute: institute,
            timestamp: serverTimestamp(),
            status: "Pending",
          });

          setFiles(Array(9).fill(null));
          setSelectedCategory("");
          console.log("File upload successful and metadata added to Firestore");
          toast.success("File Uploaded Successfully");
        } catch (error) {
          setError("There is an error uploading the file");
          toast.error("There is an error uploading the file");
          setUploading(false);
        }
      }
    );
  };

  const handleDeleteFile = async (file) => {
    if (!window.confirm(`Are you sure you want to delete ${file.name}?`))
      return;
    try {
      if (!file.url) {
        console.error("File URL is missing");
        return;
      }
      const fileRef = ref(storage, file.url);
      await deleteObject(fileRef);
      console.log("File deleted successfully");
      toast.success("File deleted successfully");
      await deleteDoc(doc(db, "faculty_files", file.id));
    } catch (error) {
      toast.error("Error deleting file");
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "faculty_files"),
        where("user_id", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const filesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserFiles(filesData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const getFileInfo = (category) => {
    const file = userFiles.find((file) => file.category === category);
    return file
      ? { status: file.status, remarks: file.remarks || "No remarks" }
      : { status: "Not Submitted", remarks: "No file submitted" };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Verified":
        return "text-green-500";
      case "Failed":
        return "text-red-500";
      case "Not Submitted":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  return isAuthorized ? (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto px-4">
              <div className="w-full mb-8">
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-4">
                    Document Status
                  </Typography>
                  <table>
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categories.map((category, index) => {
                        const { status, remarks } = getFileInfo(category);
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 ">{category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={getStatusColor(status)}>
                                {status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {remarks}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
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
      <ToastContainer />
    </>
  ) : null;
}
