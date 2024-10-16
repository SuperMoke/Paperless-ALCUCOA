import React, { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import { FlatLight } from "survey-core/themes";
import {
  Card,
  CardBody,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

function SurveyComponent() {
  const [meanValues, setMeanValues] = useState({});
  const [comments, setComments] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const survey = new Model(json);

  useEffect(() => {
    const savedData = localStorage.getItem("surveyData");
    if (savedData) {
      survey.data = JSON.parse(savedData);
    }
  }, []);

  const calculatePageMean = (pageQuestions) => {
    const values = pageQuestions
      .map((q) => {
        const value = survey.getValue(q.name);
        return typeof value === "string" ? parseFloat(value) : value;
      })
      .filter((value) => typeof value === "number" && !isNaN(value));
    return values.length
      ? values.reduce((sum, val) => sum + val, 0) / values.length
      : 0;
  };

  survey.onValueChanged.add((sender, options) => {
    const currentPage = sender.currentPage;
    if (currentPage) {
      const pageMean = calculatePageMean(currentPage.questions);
      sender.setValue(`${currentPage.name}_mean`, pageMean);
    }
    localStorage.setItem("surveyData", JSON.stringify(sender.data));
  });

  survey.onComplete.add((sender, options) => {
    const results = { ...sender.data };
    const meanValues = {};
    const comments = {};
    sender.pages.forEach((page) => {
      const pageMean = calculatePageMean(page.questions);
      results[`${page.name}_mean`] = pageMean;
      meanValues[page.title] = pageMean;

      page.questions.forEach((question) => {
        if (question.getType() === "comment") {
          comments[question.name] = sender.getValue(question.name);
        }
      });
    });
    console.log(JSON.stringify(results, null, 3));
    localStorage.setItem("surveyData", JSON.stringify(results));
    setMeanValues(meanValues);
    setComments(comments);
    setIsCompleted(true);
  });

  survey.applyTheme(FlatLight);

  return (
    <div className="container mx-auto p-4">
      {!isCompleted ? (
        <Survey model={survey} />
      ) : (
        <Card className="mt-6">
          <Typography variant="h3" color="black">
            Survey Results
          </Typography>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray">
              Summary of Ratings:
            </Typography>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Sub-Areas
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Numerical Rating
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Descriptive Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(meanValues).map(([pageTitle, meanValue]) => (
                  <tr key={pageTitle}>
                    <td className="border border-gray-300 px-4 py-2">
                      {pageTitle}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {meanValue.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {getDescriptiveRating(meanValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Typography variant="h6" color="blue-gray" className="mt-4">
              Comments:
            </Typography>
            <List>
              {Object.entries(comments).map(([pageTitle, comment]) => (
                <ListItem key={pageTitle}>
                  <Typography variant="small" color="blue-gray">
                    <strong>{pageTitle}:</strong> {comment}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function getDescriptiveRating(value) {
  if (value >= 5) return "Excellent";
  if (value >= 4) return "Very Good";
  if (value >= 3) return "Good";
  if (value >= 2) return "Fair";
  return "Poor";
}

export default SurveyComponent;
