"use client";
import {
  Typography,
  Card,
  Input,
  Select,
  Option,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../utils/auth";
import Header from "../header";
import Sidebar from "../sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// New CreateAccountModal component
const CreateAccountModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [institute, setInstitute] = useState("");
  const [accountlevel, setAccountLevel] = useState("student");
  const [name, setName] = useState("");
  const [idnumber, setIDnumber] = useState("");
  const [program, setProgram] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const defaultPassword = "student123";

  const instituteProgramMap = {
    ICSLIS: [
      "Bachelor of Science in Computer Science (BSCS)",
      "Bachelor of Science in Information Systems (BSIS)",
      "Bachelor of Library and Information Science (BLIS)",
      "Associate in Computer Technology (ACT)",
    ],
    IEAS: [
      "Bachelor of Physical Education (BPEd)",
      "Bachelor of Technical-Vocational Teacher Education Major in Food and Service Management (BTVTEd)",
      "Bachelor of Arts in English Language Studies (BAELS)",
      "Bachelor of Special Needs Education (BSNEd)",
      "Bachelor of Science in Psychology (BSPYSCH)",
      "Bachelor of Science in Mathematics (BSMATH)",
    ],
    IBM: [
      "Bachelor of Science in Tourism Management (BSTM)",
      "Bachelor of Science in Entrepreneurship (BSE)",
      "Bachelor of Science in Accountancy (BSA)",
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email domain
    const emailDomain = email.split("@")[1];
    if (emailDomain !== "cca.edu.ph") {
      toast.error("Email domain must be @cca.edu.ph");
      return;
    }

    onSubmit({
      email,
      password: defaultPassword,
      institute,
      accountlevel,
      name,
      idnumber,
      program,
      yearLevel,
    });
    setEmail("");
    setInstitute("");
    setAccountLevel("");
    setName("");
    setIDnumber("");
    setProgram("");
    setYearLevel("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Card className="w-full max-w-2xl p-8 rounded-md shadow-md">
        <Typography variant="h4" className="mb-4 text-center">
          Create Account
        </Typography>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              Name
            </Typography>
            <Input
              type="text"
              label="Enter the Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              ID Number
            </Typography>
            <Input
              type="text"
              label="Enter The ID Number"
              value={idnumber}
              onChange={(e) => setIDnumber(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              Email
            </Typography>
            <Input
              type="email"
              label="Enter the Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Typography color="gray" className="font-normal mb-1">
              Year Level
            </Typography>
            <Select
              label="Select Year Level"
              value={yearLevel}
              onChange={(e) => setYearLevel(e)}
              required
            >
              <Option value="4th Year">4th Year</Option>
              <Option value="3rd Year">3rd Year</Option>
              <Option value="2nd Year">2nd Year</Option>
              <Option value="1st Year">1st Year</Option>
            </Select>
          </div>

          <div className="col-span-2">
            <Typography color="gray" className="font-normal mb-1">
              Institute
            </Typography>
            <Select
              label="Select Institute"
              value={institute}
              onChange={(e) => setInstitute(e)}
              required
            >
              <Option value="ICSLIS">
                Institute of Computing Studies and Library Information Science
              </Option>
              <Option value="IEAS">
                Institute of Education, Arts and Sciences
              </Option>

              <Option value="IBM">Institute of Business and Management</Option>
            </Select>
            <Typography color="gray" className="font-normal mb-1">
              Program
            </Typography>
            <Select
              label="Select Program"
              value={program}
              onChange={(value) => setProgram(value)}
              required
              disabled={!institute}
            >
              {institute &&
                instituteProgramMap[institute].map((prog) => (
                  <Option key={prog} value={prog}>
                    {prog}
                  </Option>
                ))}
            </Select>
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <Button onClick={onClose} color="red" className="mr-2">
              Cancel
            </Button>
            <Button type="submit" color="green">
              Create
            </Button>
          </div>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default function HRAccount() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [userToReset, setUserToReset] = useState(null);
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
      const authorized = await isAuthenticated("hr");
      setIsAuthorized(authorized);
    };
    checkAuth();
  }, [user, loading, router]);

  useEffect(() => {
    const q = query(collection(db, "userdata"), where("role", "==", "student"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateAccount = async (userData) => {
    try {
      const response = await fetch("/api/createStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: "student123",
          name: userData.name,
          institute: userData.institute,
          idnumber: userData.idnumber,
          program: userData.program,
          yearlevel: userData.yearLevel,
          role: "student",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created successfully:", data.uid);
        setIsCreateModalOpen(false);
        toast.success("Account created successfully");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("Error creating account. Please try again");
    }
  };

  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userToDelete.id }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("User deleted successfully");
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      toast.error("Error deleting user. Please try again");
    }
  };

  const openResetDialog = (user) => {
    setUserToReset(user);
    setResetPasswordDialogOpen(true);
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userToReset.id,
          newPassword: "student123",
        }),
      });

      if (response.ok) {
        toast.success("Password reset successfully! New password: student123");
        setResetPasswordDialogOpen(false);
        setUserToReset(null);
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password!");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
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

  return isAuthorized ? (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:ml-64">
          <div className="container mx-auto">
            <Typography variant="h4" className="mb-6 text-center">
              Student Account Management
            </Typography>
            <Card className="w-full max-w-5xl mx-auto p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h5">Student Accounts</Typography>
                <Button
                  color="green"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create Account
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
                  >
                    <div>
                      <Typography variant="h6">{user.name}</Typography>
                      <Typography variant="h6" className="font-normal">
                        {user.program}
                      </Typography>
                      <Typography variant="h6" className="font-normal">
                        {user.institute}
                      </Typography>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        color="green"
                        size="sm"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => openDeleteDialog(user)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="blue"
                        size="sm"
                        onClick={() => openResetDialog(user)}
                      >
                        Reset Password
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
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

        <Dialog
          open={resetPasswordDialogOpen}
          handler={() => setResetPasswordDialogOpen(false)}
        >
          <DialogHeader>Confirm Password Reset</DialogHeader>
          <DialogBody>
            Are you sure you want to reset the password for {userToReset?.name}?
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={() => setResetPasswordDialogOpen(false)}
              className="mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog
          open={deleteDialogOpen}
          handler={() => setDeleteDialogOpen(false)}
        >
          <DialogHeader>Confirm Deletion</DialogHeader>
          <DialogBody>
            Are you sure you want to delete {userToDelete?.name} account?
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={() => setDeleteDialogOpen(false)}
              className="mr-1"
            >
              Cancel
            </Button>
            <Button variant="gradient" color="red" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      {isModalOpen && <Modal user={selectedUser} onClose={handleModalClose} />}
      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAccount}
      />
      <ToastContainer />
    </div>
  ) : null;
}
