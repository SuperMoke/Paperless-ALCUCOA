"use client";
import React, { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { FlatLight } from "survey-core/themes";
import { SurveyPDF } from "survey-pdf";
import { Document, Packer } from "docx";
import { createPersonalPortfolio } from "./portfolioDocxGenerator";
import { generateDocument } from "./documentGenerator";

const survey = new Model(json);

// Add these lines right after const survey = new Model(json);

const saveAsDocx = async (data) => {
  try {
    await generateDocument(data);
    alert("Document generated successfully!");
  } catch (error) {
    console.error("Error generating document:", error);
    alert("Error generating document. Please try again.");
  }
};

survey.addNavigationItem({
  id: "survey_save_as_docx",
  title: "Save as DOCX",
  visibleIndex: 52,
  action: () => {
    saveAsDocx(survey.data);
  },
});

function SurveyComponent({ uid, email, surveyData }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!surveyData) {
      survey.data = surveyData;
    } else {
      const savedData = localStorage.getItem("surveyData");
      if (savedData) {
        survey.data = JSON.parse(savedData);
      }
    }
    survey.onValueChanged.add((sender, options) => {
      localStorage.setItem("surveyData", JSON.stringify(sender.data));
    });
  }, [surveyData]);

  survey.onComplete.add(async (sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
    try {
      const userDataRef = collection(db, "userdata");
      const q = query(userDataRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      let institute = "";
      let name = "";
      querySnapshot.forEach((doc) => {
        institute = doc.data().institute;
        name = doc.data().name;
      });

      const surveyDocRef = doc(db, "surveys", uid);
      await setDoc(surveyDocRef, {
        uid: uid,
        email: email,
        name: name,
        institute: institute,
        surveyData: sender.data,
        timestamp: new Date(),
      });

      setIsSaved(true);
      window.location.reload();
    } catch (error) {
      console.error("Error saving survey data: ", error);
    }
  });

  survey.applyTheme(FlatLight);

  return <Survey model={survey} />;
}

export default SurveyComponent;
