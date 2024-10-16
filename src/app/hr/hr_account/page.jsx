"use client";

import {
  Typography,
  Card,
  Input,
  Select,
  Option,
  Button,
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

// New CreateAccountModal component
const CreateAccountModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institute, setInstitute] = useState("");
  const [accountlevel, setAccountLevel] = useState("");
  const [name, setName] = useState("");
  const [idnumber, setIDnumber] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      email,
      password,
      institute,
      accountlevel,
      name,
      idnumber,
      position,
      status,
    });
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
              Position
            </Typography>
            <Input
              type="text"
              label="Enter The Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              Password
            </Typography>
            <Input
              type="password"
              label="Enter The Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              Full Time/Part Time
            </Typography>
            <Select
              label="Select Status"
              value={status}
              onChange={(e) => setStatus(e)}
              required
            >
              <Option value="Full Time">Full Time</Option>
              <Option value="Part Time">Part Time</Option>
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
                Institute of Education,Arts and Sciences
              </Option>

              <Option value="IBM">Institute of Business and Management</Option>
            </Select>

            <Typography color="gray" className="font-normal mt-2">
              Account Level
            </Typography>
            <Select
              label="Select Account Level"
              value={accountlevel}
              onChange={(e) => setAccountLevel(e)}
              required
            >
              <Option value="faculty">FACULTY</Option>
              <Option value="admin">ADMIN</Option>
              <Option value="ovpa">OVPA</Option>
              <Option value="hr">Human Resource</Option>
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
    const q = query(
      collection(db, "userdata"),
      where("role", "in", ["admin", "faculty", "ovpa", "hr"])
    );

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
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          role: userData.accountlevel,
          name: userData.name,
          institute: userData.institute,
          idnumber: userData.idnumber,
          position: userData.position,
          status: userData.status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created successfully:", data.uid);
        setIsCreateModalOpen(false);
        // You might want to refresh the users list here
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      // You might want to show an error message to the user here
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(`Are you sure you want to delete the account?`)) return;
    try {
      const response = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userId }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User deleted successfully");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
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

  return isAuthorized ? (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:ml-64">
          <div className="container mx-auto">
            <Typography variant="h4" className="mb-6 text-center">
              Account Management
            </Typography>
            <Card className="w-full max-w-5xl mx-auto p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h5">User Accounts</Typography>
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
                      <Typography color="gray" className="text-sm">
                        {user.position}
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
                        onClick={() => handleDeleteUser(user.id, user.email)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
      {isModalOpen && <Modal user={selectedUser} onClose={handleModalClose} />}
      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAccount}
      />
    </div>
  ) : null;
}
