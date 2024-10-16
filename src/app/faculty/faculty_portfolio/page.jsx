"use client";
import React, { useState, useEffect } from "react";
import { Typography, Card } from "@material-tailwind/react";
import { auth, db } from "../../firebase";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../utils/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SurveyComponent from "./Components/SurveyComponent";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function FacultyPortfolio() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("User is not authenticated, redirecting to home...");
      router.push("/");
      return;
    }
    const checkAuth = async () => {
      const authorized = await isAuthenticated("faculty");
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
      <div className="bg-white min-h-screen ">
        <div className="flex-1">
          <Header />
          <div className="flex flex-col items-center h-[calc(100vh-64px)]  pt-16">
            <Typography variant="h2" className="mb-8 text-center text-black">
              Faculty Portfolio
            </Typography>
            <div className="container mx-auto">
              {user && (
                <SurveyComponent
                  uid={user.uid}
                  email={email}
                  surveyData={surveyData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  ) : null;
}
