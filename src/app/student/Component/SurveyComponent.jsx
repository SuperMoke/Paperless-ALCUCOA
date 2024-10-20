import React, { useEffect } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import { FlatLight } from "survey-core/themes";
import {
  query,
  where,
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

function SurveyComponent({ onComplete }) {
  const [user, loading] = useAuthState(auth);
  const survey = new Model(json);

  survey.onComplete.add((sender, options) => {
    handleCompleteSurvey(sender.data);
  });

  const handleCompleteSurvey = async (surveyData) => {
    try {
      // Extract and save radio group questions and their details
      const radioGroupQuestions = [];
      const questions = survey.getAllQuestions();
      questions.forEach((question) => {
        if (question.getType() === "radiogroup") {
          const choices = question.choices.map((choice) => ({
            value: choice.value,
            text: choice.text,
          }));
          radioGroupQuestions.push({
            title: question.title,
            name: question.name,
            choices: choices,
            userResponse: surveyData[question.name],
          });
        }
      });

      // Query the document based on studentId
      const q = query(
        collection(db, "studentsurveys"),
        where("studentId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No survey found for this student.");
        return;
      }

      // Assuming there is only one document per studentId
      const surveyDoc = querySnapshot.docs[0];
      const surveyRef = doc(db, "studentsurveys", surveyDoc.id);

      // Update the document
      await updateDoc(surveyRef, {
        status: "completed",
        completedAt: serverTimestamp(),
        responses: surveyData,
        radioGroupQuestions: radioGroupQuestions,
      });

      toast.success("Survey completed successfully!");
    } catch (error) {
      console.error("Error completing survey:", error);
      toast.error("Failed to submit survey. Please try again.");
    }
  };

  survey.applyTheme(FlatLight);
  return <Survey model={survey} />;
}

export default SurveyComponent;
