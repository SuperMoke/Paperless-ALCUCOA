"use client";
import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const db = getFirestore();
      const userQuery = query(
        collection(db, "userdata"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          const role = userData.role;
          if (role === "admin") {
            router.push("/admin");
          } else if (role === "faculty") {
            router.push("/faculty");
          } else if (role === "ovpa") {
            router.push("/ovpa");
          } else if (role === "hr") {
            router.push("/hr");
          } else if (role === "student") {
            router.push("/student");
          } else {
            toast.error("There is something wrong with the user role");
          }
        });
      } else {
        toast.error("User not found or role not specified");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#8d9e84] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card color="white" shadow={true} className="p-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/Logo_Alcucoa.jpeg"
              width={250}
              height={250}
              alt="CCA Logo"
            />
          </div>
          <Typography
            variant="h4"
            color="blue-gray"
            className="text-center mb-2"
          >
            Sign In
          </Typography>
          <Typography color="gray" className="mb-6 font-normal text-center">
            Enter your details to login.
          </Typography>
          <form onSubmit={handleLogin}>
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="mt-6 bg-green-900"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}
