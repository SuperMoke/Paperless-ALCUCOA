"use client";
import React, { useState, useEffect } from "react";

import {
  Card,
  Step,
  Stepper,
  Typography,
  Button,
  Radio,
  Input,
} from "@material-tailwind/react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/app/utils/auth";
import Header from "../header";
import Sidebar from "../sidebar";
import SurveyComponent from "./Components/SurveyComponent";

export default function AdminForms() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

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
    };
    checkAuth();
  }, [user, loading, router]);

  return isAuthorized ? (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto px-4">
              <Typography variant="h2" className="mb-4 text-center">
                ALCU COMMISSION ON ACCREDITATION SURVEY FORM
              </Typography>
              <SurveyComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
