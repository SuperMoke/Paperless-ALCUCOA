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
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/app/utils/auth";
import Header from "../header";
import Sidebar from "../sidebar";
import SurveyComponent_Area2 from "./Components/SurveyComponent_Area2";
import SurveyComponent_Area3 from "./Components/SurveyComponent_Area3";

export default function AdminForms() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [headerText, setHeaderText] = useState(
    "ALCU COMMISSION ON ACCREDITATION SURVEY FORM"
  );
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

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    setHeaderText(area);
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

  const renderSurveyComponent = () => {
    switch (selectedArea) {
      case "Area II: Faculty":
        return <SurveyComponent_Area2 />;
      case "Area III: Curriculum and Instruction":
        return <SurveyComponent_Area3 />;
      default:
        return null;
    }
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
                renderSurveyComponent()
              )}
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
            Your session has expired due to inactivity. You will be redirected
            to the login page.
          </DialogBody>
          <DialogFooter>
            <Button onClick={handleTimeout} color="green">
              Okay
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  ) : null;
}
