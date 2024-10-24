"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Input,
  Button,
} from "@material-tailwind/react";
import { auth, db } from "@/app/firebase";
import Header from "../header";
import Sidebar from "../sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { isAuthenticated } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import SurveyComponent from "./Components/SurveyComponent";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Fuse from "fuse.js";

export default function HRForm() {
  const [selectedInstitute, setSelectedInstitute] = useState("All");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [surveyData, setSurveyData] = useState(null);
  const [facultyName, setFacultyName] = useState("");
  const [error, setError] = useState("");
  const [allSurveys, setAllSurveys] = useState([]);
  // Fuse.js options for fuzzy search
  const fuseOptions = {
    keys: ["name", "institute"],
    threshold: 0.3,
    includeScore: true,
  };

  useEffect(() => {
    if (!user) return;

    // Real-time listener for surveys
    const surveysRef = collection(db, "surveys");
    const unsubscribe = onSnapshot(surveysRef, (snapshot) => {
      const surveys = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllSurveys(surveys);
    });

    return () => unsubscribe();
  }, [user]);

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
    if (facultyName || selectedInstitute !== "All") {
      const fuse = new Fuse(allSurveys, fuseOptions);

      let searchResults = allSurveys;

      if (facultyName) {
        const fuseResults = fuse.search(facultyName);
        searchResults = fuseResults.map((result) => result.item);
      }

      if (selectedInstitute !== "All") {
        searchResults = searchResults.filter(
          (survey) => survey.institute === selectedInstitute
        );
      }

      if (searchResults.length > 0) {
        setSurveyData(searchResults[0].surveyData);
        setError("");
      } else {
        setSurveyData(null);
        setError("No matching faculty found");
      }
    }
  }, [facultyName, selectedInstitute, allSurveys]);

  return isAuthorized ? (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64">
            <div className="container mx-auto px-4">
              <Card className="w-full mb-8">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-4">
                    Faculty Portfolio
                  </Typography>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <Input
                      type="text"
                      label="Faculty Name"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      className="w-full"
                    />
                    <Select
                      label="Select Institute"
                      value={selectedInstitute}
                      onChange={(value) => setSelectedInstitute(value)}
                      required
                    >
                      <Option value="All">All Institutes</Option>
                      <Option value="ICSLIS">
                        Institute of Computing Studies and Library Information
                        Science
                      </Option>
                      <Option value="IEAS">
                        Institute of Education, Arts and Sciences
                      </Option>
                      <Option value="IBM">
                        Institute of Business and Management
                      </Option>
                    </Select>
                  </div>
                  {error && <Typography color="red">{error}</Typography>}
                  {surveyData && <SurveyComponent surveyData={surveyData} />}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
