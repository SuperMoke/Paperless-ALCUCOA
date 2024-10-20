"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
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
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";
import Header from "../header";
import Sidebar from "../sidebar";

export default function FacultyFiles() {
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

  return isAuthorized ? (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto px-4">
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Upload Files
              </Typography>
              <div className="mt-8 mb-5">
                <Typography color="blue-gray" className="mb-4">
                  Upload Requirements:
                </Typography>
                <Select
                  label="Select Category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category, index) => (
                    <Option key={index} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
                {selectedCategory && (
                  <>
                    <h2 className="text-black mr-2 mt-4 mb-2">
                      {selectedCategory}:
                    </h2>
                    <div className="relative flex w-full max-w-96 items-center">
                      <Input
                        type="file"
                        size="md"
                        onChange={(e) =>
                          handleFileChange(
                            e,
                            categories.indexOf(selectedCategory)
                          )
                        }
                        className="pr-20 pt-2"
                        containerProps={{
                          className: "min-w-0",
                        }}
                      />
                      <Button
                        size="sm"
                        disabled={
                          !files[categories.indexOf(selectedCategory)] ||
                          uploading
                        }
                        color={
                          files[categories.indexOf(selectedCategory)]
                            ? "green"
                            : "gray"
                        }
                        className="!absolute right-1 top-1 rounded bg-green-900"
                        onClick={() =>
                          handleUpload(categories.indexOf(selectedCategory))
                        }
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <Typography color="blue-gray" className="mb-4 font-bold">
                My Files
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category, index) => {
                  const categoryFiles = userFiles.filter(
                    (file) => file.category === category
                  );
                  return (
                    <div key={index} className="p-2 border rounded">
                      <Typography
                        color="blue-gray"
                        className="font-semibold mb-2"
                      >
                        {category}
                      </Typography>
                      {categoryFiles.length > 0 ? (
                        categoryFiles.map((file, fileIndex) => (
                          <div
                            key={fileIndex}
                            className="flex items-center justify-between text-sm text-gray-600 mb-2"
                          >
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
                        ))
                      ) : (
                        <Typography color="gray" className="text-sm italic">
                          No files uploaded for this category.
                        </Typography>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  ) : null;
}
