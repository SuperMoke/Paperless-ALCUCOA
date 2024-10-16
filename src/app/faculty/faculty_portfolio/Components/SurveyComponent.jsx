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

function SurveyComponent({ uid, email, surveyData }) {
  const survey = React.useMemo(() => new Model(json), []);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (surveyData) {
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
  }, [survey, surveyData]);

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

    localStorage.removeItem("surveyData");
  });

  survey.applyTheme(FlatLight);

  return (
    <div>
      <Survey model={survey} />
    </div>
  );
}

export default SurveyComponent;
