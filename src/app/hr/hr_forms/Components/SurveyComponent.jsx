import React, { useEffect, useMemo } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import { FlatLight } from "survey-core/themes";
import { SurveyPDF } from "survey-pdf";

// Add the PDF save function
const savePdf = async (data) => {
  const surveyPDF = new SurveyPDF(json);
  surveyPDF.mode = "display";
  surveyPDF.data = data;
  const pdfOptions = {
    fontSize: 12,
    margins: {
      left: 10,
      right: 10,
      top: 10,
      bot: 10,
    },
    format: [210, 297],
  };
  surveyPDF.save("portfolio.pdf", pdfOptions);
};

function SurveyComponent({ surveyData }) {
  const survey = useMemo(() => {
    const model = new Model(json);

    // Make all pages except the first one read-only
    model.pages.forEach((page, index) => {
      if (index > 0) {
        page.questions.forEach((question) => {
          question.readOnly = true;
        });
      }
    });

    // Add PDF download button
    model.addNavigationItem({
      id: "survey_save_as_file",
      title: "Save as PDF",
      visibleIndex: 51,
      action: () => {
        savePdf(model.data);
      },
    });

    return model;
  }, []);

  useEffect(() => {
    if (surveyData) {
      survey.data = surveyData;
    }
  }, [survey, surveyData]);

  survey.applyTheme(FlatLight);

  return (
    <div>
      <div className="mb-4"></div>
      <Survey model={survey} />
    </div>
  );
}

export default SurveyComponent;
