import React, { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { jsonArea2 } from "./jsonArea2";
import { FlatLight } from "survey-core/themes";
import {
  Card,
  CardBody,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function SurveyComponent({ area }) {
  const [meanValues, setMeanValues] = useState({});
  const [comments, setComments] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const surveyConfig = jsonArea2;

  const survey = new Model(surveyConfig);

  useEffect(() => {
    const savedData = localStorage.getItem("surveyData_2");
    if (savedData) {
      survey.data = JSON.parse(savedData);
    }
  }, []);

  const calculatePageMean = (pageQuestions) => {
    const radioQuestions = pageQuestions.filter(
      (q) => q.getType() === "radiogroup"
    );
    const totalQuestions = radioQuestions.length;

    if (totalQuestions === 0) return 0;

    const sum = radioQuestions.reduce((acc, q) => {
      const value = survey.getValue(q.name);
      const numValue =
        typeof value === "string"
          ? parseFloat(value)
          : typeof value === "number"
          ? value
          : 0;
      return acc + numValue;
    }, 0);

    return Math.round((sum / totalQuestions) * 10) / 10; // Round to 1 decimal place
  };

  survey.onValueChanged.add((sender, options) => {
    const currentPage = sender.currentPage;
    if (currentPage) {
      const pageMean = calculatePageMean(currentPage.questions);
      sender.setValue(`${currentPage.name}_mean`, pageMean);
    }
    localStorage.setItem(`surveyData_2`, JSON.stringify(sender.data));
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
    localStorage.setItem(`surveyData_2`, JSON.stringify(results));
    setMeanValues(meanValues);
    setComments(comments);
    setIsCompleted(true);
  });

  survey.applyTheme(FlatLight);

  const downloadPdf = () => {
    const input = document.getElementById("survey-results-card");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("survey_results.pdf");
    });
  };

  return (
    <div className="container mx-auto p-4">
      {!isCompleted ? (
        <Survey model={survey} />
      ) : (
        <div>
          <Card id="survey-results-card" className="mt-6 p-4">
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
                        {meanValue.toFixed(1)}
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
          <button
            onClick={downloadPdf}
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
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
