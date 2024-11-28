"use client";
import React, { useState, useEffect, useRef } from "react";
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
import Header from "../header";
import Sidebar from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { isAuthenticated } from "@/app/utils/auth";
import { useRouter } from "next/navigation";

export default function AdminFiles() {
  const [files, setFiles] = useState([]);
  const [facultyFiles, setFacultyFiles] = useState([]);
  const [adminFiles, setAdminFiles] = useState([]);
  const [ovpaFiles, setOvpaFiles] = useState([]);
  const [hrFiles, setHrFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedInstitute, setSelectedInstitute] = useState("All");

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [facultyFilter, setFacultyFilter] = useState("");
  const fileInputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
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
      const authorized = await isAuthenticated("admin");
      setIsAuthorized(authorized);
      // Query userdata
      const usersRef = collection(db, "userdata");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().name);
      });
    };
    checkAuth();
  }, [user, loading, router]);

  const categories = [
    "All",
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
    const fetchFacultyNames = async () => {
      const usersRef = collection(db, "userdata");
      const q = query(usersRef, where("role", "==", "faculty"));
      const querySnapshot = await getDocs(q);
      const facultyNames = querySnapshot.docs
        .map((doc) => doc.data().name)
        .filter((name) => name);
      setFacultyOptions(["All", ...facultyNames]);
    };

    fetchFacultyNames();
  }, []);

  useEffect(() => {
    const fetchFiles = () => {
      const filesRef = collection(db, "faculty_files");
      const unsubscribe = onSnapshot(filesRef, (snapshot) => {
        const filesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFacultyFiles(filesData);
      });

      return () => unsubscribe();
    };

    fetchFiles();
  }, []);

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
    if (!user) return;
    const fetchFiles = () => {
      const filesRef = collection(db, "admin_files");
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

  useEffect(() => {
    const fetchHrFiles = () => {
      const filesRef = collection(db, "hr_files");
      const unsubscribe = onSnapshot(filesRef, (snapshot) => {
        const filesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHrFiles(filesData);
      });

      return () => unsubscribe();
    };

    fetchHrFiles();
  }, []);

  useEffect(() => {
    // Define the status order
    const statusOrder = { Pending: 1, Failed: 2, Verified: 3 };

    const filtered = facultyFiles
      .filter((file) => {
        const categoryMatch =
          selectedCategory === "All" || file.category === selectedCategory;
        const facultyMatch =
          facultyFilter === "" ||
          file.user_name.toLowerCase().includes(facultyFilter.toLowerCase());
        const instituteMatch =
          selectedInstitute === "All" || file.institute === selectedInstitute;
        return categoryMatch && facultyMatch && instituteMatch;
      })
      .sort((a, b) => {
        // First, sort by status
        const statusA = a.status || "Pending";
        const statusB = b.status || "Pending";
        const statusComparison = statusOrder[statusA] - statusOrder[statusB];

        if (statusComparison !== 0) {
          return statusComparison; // Lower number means higher priority
        }

        // If statuses are the same, sort by date (newest first)
        const dateA = a.timestamp?.toDate() || new Date(0);
        const dateB = b.timestamp?.toDate() || new Date(0);
        return dateB - dateA; // Newest dates first
      });

    setFilteredFiles(filtered);
  }, [facultyFiles, selectedCategory, facultyFilter, selectedInstitute]);

  const openDeleteDialog = (file) => {
    setFileToDelete(file);
    setDeleteDialogOpen(true);
  };

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

  const recordFileView = async (fileId, fileName) => {
    if (!user) return;
    try {
      const viewRef = collection(db, "file_views");
      await addDoc(viewRef, {
        file_id: fileId,
        file_name: fileName,
        viewer_id: user.uid,
        viewer_name: userName,
        timestamp: serverTimestamp(),
      });
      console.log("File view recorded successfully");
    } catch (error) {
      console.error("Error recording file view:", error);
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
          await addDoc(collection(db, "admin_files"), {
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

  const handleStatusChange = async (fileId, newStatus) => {
    try {
      const fileRef = doc(db, "faculty_files", fileId);
      await updateDoc(fileRef, { status: newStatus });
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleOpenModal = (fileId, currentRemarks) => {
    setCurrentFileId(fileId);
    setRemarks(currentRemarks || "");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentFileId(null);
    setRemarks("");
  };

  const handleSubmitRemarks = async () => {
    try {
      const fileRef = doc(db, "faculty_files", currentFileId);
      await updateDoc(fileRef, { remarks: remarks });
      toast.success("Remarks updated successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating remarks:", error);
      toast.error("Failed to update remarks");
    }
  };

  const handleDeleteFile = async () => {
    try {
      const fileRef = ref(
        storage,
        decodeURIComponent(fileToDelete.url.split("/o/")[1].split("?")[0])
      );
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "admin_files", fileToDelete.id));
      toast.success("File deleted successfully");
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file");
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
              <Card className="w-full mb-8">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-4">
                    Faculty Files
                  </Typography>
                  <div className="flex flex-col md:flex-row gap-4 ">
                    <Input
                      type="text"
                      label="Filter by Faculty Name"
                      value={facultyFilter}
                      onChange={(e) => setFacultyFilter(e.target.value)}
                      className="w-full"
                    />
                    <Select
                      value={selectedCategory}
                      onChange={(value) => setSelectedCategory(value)}
                      label="Filter by Category"
                    >
                      {categories.map((category) => (
                        <Option key={category} value={category}>
                          {category}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      label="Select Institute"
                      value={selectedInstitute}
                      onChange={(value) => setSelectedInstitute(value)}
                      required
                    >
                      <Option value="All">All Institutes</Option>
                      <Option value="ICSLIS">
                        Institute of Computing Studies and Library Information
                        Science
                      </Option>
                      <Option value="IEAS">
                        Institute of Education, Arts and Sciences
                      </Option>

                      <Option value="IBM">
                        Institute of Business and Management
                      </Option>
                    </Select>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 mt-2">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uploaded By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Upload Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFiles.map((file, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.user_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.timestamp
                              ? new Date(
                                  file.timestamp.toDate()
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Select
                              value={file.status || "Pending"}
                              onChange={(value) =>
                                handleStatusChange(file.id, value)
                              }
                            >
                              <Option value="Pending">Pending</Option>
                              <Option value="Verified">Verified</Option>
                              <Option value="Failed">Failed</Option>
                            </Select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2 ">
                              <DocumentTextIcon
                                className="h-5 w-5 text-blue-500 cursor-pointer"
                                onClick={() => {
                                  recordFileView(file.id, file.name);
                                  window.open(file.url, "_blank");
                                }}
                              />
                              <PencilIcon
                                className="h-5 w-5 text-green-500 cursor-pointer"
                                onClick={() =>
                                  handleOpenModal(file.id, file.remarks)
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>

              <Card className="w-full mb-8">
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
                        ref={fileInputRef}
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
                              onClick={() => openDeleteDialog(file)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card className="w-full mb-8">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-4">
                    HR Files
                  </Typography>
                  <table className="min-w-full divide-y divide-gray-200 mt-2">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uploaded By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Upload Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...ovpaFiles, ...hrFiles].map((file, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.user_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.timestamp
                              ? new Date(
                                  file.timestamp.toDate()
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2 ">
                              <DocumentTextIcon
                                className="h-5 w-5 text-blue-500 cursor-pointer"
                                onClick={() => {
                                  recordFileView(file.id, file.name);
                                  window.open(file.url, "_blank");
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
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
          Your session has expired due to inactivity. You will be redirected to
          the login page.
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleTimeout} color="green">
            Okay
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openModal} handler={handleCloseModal} size="xs">
        <DialogHeader>Add Remarks</DialogHeader>
        <DialogBody divider>
          <div className="mt-2">
            <Input
              type="text"
              label="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmitRemarks}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        handler={() => setDeleteDialogOpen(false)}
      >
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete {fileToDelete?.name}?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setDeleteDialogOpen(false)}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="red" onClick={handleDeleteFile}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </>
  ) : null;
}
