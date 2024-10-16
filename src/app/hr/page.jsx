"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Button,
  Input,
  Progress,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { auth, db, storage } from "@/app/firebase";
import {
  DocumentTextIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { isAuthenticated } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import Header from "./header";
import Sidebar from "./sidebar";

export default function HumanResource() {
  const [files, setFiles] = useState([]);
  const [adminFiles, setAdminFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("User is not authenticated, redirecting to home...");
      router.push("/");
      return;
    }
    const checkAuth = async () => {
      const authorized = await isAuthenticated("hr");
      setIsAuthorized(authorized);
    };
    checkAuth();
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchFiles = () => {
      const filesRef = collection(db, "hr_files");
      const q = query(filesRef, where("user_id", "==", user.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const filesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFiles(filesData);
        setAdminFiles(filesData);
      });

      return () => unsubscribe();
    };

    fetchFiles();
  }, [user]);

  const handleFileChange = (event) => {
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
        setFiles([selectedFile]);
        setError("");
      }
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("No file selected for upload.");
      toast.error("No file selected for upload.");
      return;
    }

    const file = files[0];
    const user = auth.currentUser;
    if (!file || !user) return;

    const user_id = user.uid;
    const user_email = user.email;

    const q = query(
      collection(db, "userdata"),
      where("email", "==", user_email)
    );
    const querySnapshot = await getDocs(q);
    let userName = "";
    querySnapshot.forEach((doc) => {
      userName = doc.data().name;
    });

    const storageRef = ref(storage, `files/${user_id}/${file.name}`);
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
        toast.error("There is an error uploading the file");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          await addDoc(collection(db, "hr_files"), {
            user_id,
            user_name: userName,
            name: file.name,
            url: downloadURL,
            timestamp: serverTimestamp(),
          });
          console.log("File upload successful and metadata added to Firestore");
          toast.success("File uploaded successfully!");
          setFiles([]);
        } catch (error) {
          setError("There is an error uploading the file");
          setUploading(false);
          toast.error("There is an error uploading the file");
        }
      }
    );
  };

  const handleDeleteFile = async (file) => {
    if (!window.confirm(`Are you sure you want to delete ${file.name}?`))
      return;
    try {
      const fileRef = ref(
        storage,
        decodeURIComponent(file.url.split("/o/")[1].split("?")[0])
      );
      await deleteObject(fileRef);
      console.log("File deleted successfully from storage");
      await deleteDoc(doc(db, "ovpa_files", file.id));
      console.log("File metadata deleted successfully from Firestore");
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return isAuthorized ? (
    <>
      {uploading && <Progress value={progress} color="green" className="h-2" />}
      <div className="flex flex-col  min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto px-4">
              <Card className="w-full">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-4">
                    Uploaded Files
                  </Typography>
                  <div className="mt-8 mb-5">
                    <div className="relative flex w-full max-w-96 items-center">
                      <Input
                        type="file"
                        size="md"
                        onChange={handleFileChange}
                        className="pr-20 pt-2"
                        containerProps={{
                          className: "min-w-0",
                        }}
                      />
                      <Button
                        size="sm"
                        disabled={files.length === 0 || uploading}
                        color={files.length > 0 ? "green" : "gray"}
                        className="!absolute right-1 top-1 rounded bg-green-900"
                        onClick={handleUpload}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                  <Typography color="blue-gray" className="mb-4 font-bold">
                    My Files
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {adminFiles.map((file, index) => (
                      <div key={index} className="p-2 border rounded">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span className="truncate max-w-[70%]">
                            {file.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <DocumentTextIcon
                              className="h-5 w-5 text-blue-500 cursor-pointer"
                              onClick={() => window.open(file.url, "_blank")}
                            />
                            <TrashIcon
                              className="h-5 w-5 text-red-500 cursor-pointer"
                              onClick={() => handleDeleteFile(file)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  ) : null;
}
