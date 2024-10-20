"use client";
import React, { useState, useEffect } from "react";
import { Typography, Card } from "@material-tailwind/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/app/utils/auth";
import Header from "../header";
import Sidebar from "../sidebar";
import SurveyComponent from "./Components/SurveyComponent";

export default function AdminForms() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [headerText, setHeaderText] = useState(
    "ALCU COMMISSION ON ACCREDITATION SURVEY FORM"
  );

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

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    setHeaderText(area);
  };

  return isAuthorized ? (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto px-4">
              <Typography variant="h2" className="mb-4 text-center">
                {headerText}
              </Typography>
              {!selectedArea ? (
                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                  <Card
                    className="w-full  h-96 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => handleAreaClick("Area II: Faculty")}
                  >
                    <div className="text-8xl mb-2">👨‍🏫</div>
                    <Typography variant="h2" className="text-center">
                      Area II: Faculty
                    </Typography>
                    <Typography variant="medium" color="gray" className="mt-2">
                      Click to start
                    </Typography>
                  </Card>
                  <Card
                    className="w-full h-96 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() =>
                      handleAreaClick("Area III: Curriculum and Instruction")
                    }
                  >
                    <div className="text-8xl mb-2">📚</div>
                    <Typography variant="h2" className="text-center">
                      Area III: Curriculum and Instruction
                    </Typography>
                    <Typography variant="medium" color="gray" className="mt-2">
                      Click to start
                    </Typography>
                  </Card>
                </div>
              ) : (
                <SurveyComponent area={selectedArea} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
