"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const checkPasswordChanged = async () => {
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "userdata", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().passwordChanged) {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };
    checkPasswordChanged();
  }, []);

  const checkPasswordRequirements = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password),
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must meet all requirements");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      const db = getFirestore();
      await setDoc(
        doc(db, "users", user.uid),
        { passwordChanged: true },
        { merge: true }
      );

      toast.success("Password updated successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Error updating password. Please try again.");
      console.error("Error:", error);
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
            Change Password
          </Typography>
          <Typography color="gray" className="mb-6 font-normal text-center">
            Please set a new password for your account
          </Typography>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative flex w-full">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    checkPasswordRequirements(e.target.value);
                  }}
                  required
                  className="pr-20"
                />
                <IconButton
                  variant="text"
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </IconButton>
              </div>

              <div className="relative flex w-full">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-20"
                />
                <IconButton
                  variant="text"
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </IconButton>
              </div>
            </div>

            <div className="mt-2 mb-4 space-y-1">
              <div
                className={`text-xs ${
                  passwordRequirements.length
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordRequirements.length ? "✓" : "✗"} At least 8 characters
              </div>
              <div
                className={`text-xs ${
                  passwordRequirements.uppercase
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordRequirements.uppercase ? "✓" : "✗"} One uppercase
                letter
              </div>
              <div
                className={`text-xs ${
                  passwordRequirements.lowercase
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordRequirements.lowercase ? "✓" : "✗"} One lowercase
                letter
              </div>
              <div
                className={`text-xs ${
                  passwordRequirements.number
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordRequirements.number ? "✓" : "✗"} One number
              </div>
              <div
                className={`text-xs ${
                  passwordRequirements.special
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordRequirements.special ? "✓" : "✗"} One special character
                (@$!%*?&)
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 bg-green-900"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </Button>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}
