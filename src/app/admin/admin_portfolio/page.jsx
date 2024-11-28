"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { auth, db } from "../../firebase";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../utils/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../header";
import Sidebar from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SurveyComponent from "./Components/SurveyComponent";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function AdminPortfolio() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [surveyData, setSurveyData] = useState(null);
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
    };
    checkAuth();
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            setEmail(user.email);
          } else {
            console.log("User is signed out");
          }
        });
      } catch (error) {
        console.error("Error fetching auth data", error);
      }
    };
    fetchUserData();
  });

  useEffect(() => {
    const fetchSurveyData = async () => {
      if (user && email) {
        const surveysRef = collection(db, "surveys");
        const q = query(surveysRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setSurveyData(doc.data().surveyData);
        }
      }
    };
    fetchSurveyData();
  }, [user, email]);

  return isAuthorized ? (
    <>
      <div className="bg-blue-gray-50 min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto">
              <Typography variant="h2" className="mb-8 text-center text-black">
                Admin Portfolio
              </Typography>
              {user && (
                <SurveyComponent
                  uid={user.uid}
                  email={email}
                  surveyData={surveyData}
                />
              )}
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  ) : null;
}
