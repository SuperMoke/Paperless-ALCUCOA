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

export default function Student() {
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
      const authorized = await isAuthenticated("student");
      setIsAuthorized(authorized);
    };
    checkAuth();
  }, [user, loading, router]);

  return isAuthorized ? (
    <>
      <div className="flex flex-col  min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto px-4"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  ) : null;
}
