import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const generateDocument = async (data) => {
  // Load the template
  const response = await fetch("/templates/portfolio_template.docx");
  const templateContent = await response.arrayBuffer();

  const zip = new PizZip(templateContent);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  console.log("Survey Data:", data);

  // Format the data for the template
  const templateData = {
    generatedDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    fullName: `${data.question2 || ""} ${data.question3 || ""} ${
      data.question1 || ""
    }`,
    surname: data.question1 || "",
    givenName: data.question2 || "",
    middleName: data.question3 || "",
    address: data.question4 || "",
    dateOfBirth: data.question5 || "",
    placeOfBirth: data.question6 || "",
    age: data.question7 || "",
    contactNo: data.question8 || "",
    email: data.question9 || "",
    sex: data.question10 || "",
    civilStatus: data.question11 || "",
    spouse: data.question12 || "",
    children: data.question13 || "",

    // Professional License
    licenses: Array.isArray(data?.question14)
      ? data.question14.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
        }))
      : [],

    // Education
    degrees: Array.isArray(data?.question15)
      ? data.question15.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],
    ongoingDegrees: Array.isArray(data?.question16)
      ? data.question16.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],

    // Work Experience
    workExperience: Array.isArray(data?.question17)
      ? data.question17.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],

    // Innovation
    innovations: Array.isArray(data?.question18)
      ? data.question18.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
        }))
      : [],
    patents: Array.isArray(data?.question19)
      ? data.question19.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
        }))
      : [],

    // Research
    publications: Array.isArray(data?.question20)
      ? data.question20.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],
    presentations: Array.isArray(data?.question21)
      ? data.question21.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],
    editorialBoard: Array.isArray(data?.question22)
      ? data.question22.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],

    // Professional Development
    professionalDevelopment: Array.isArray(data?.question23)
      ? data.question23.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],
    professionalMemberships: Array.isArray(data?.question24)
      ? data.question24.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
        }))
      : [],
    linkages: Array.isArray(data?.question25)
      ? data.question25.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
        }))
      : [],
    speakerships: Array.isArray(data?.question26)
      ? data.question26.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
        }))
      : [],
    accreditations: Array.isArray(data?.question27)
      ? data.question27.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
        }))
      : [],
    awards: Array.isArray(data?.question28)
      ? data.question28.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],
    forums: Array.isArray(data?.question29)
      ? data.question29.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
        }))
      : [],

    // Community Involvement
    communityOutreach: Array.isArray(data?.question30)
      ? data.question30.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
          Column6: (row["Column 6"] || "") + "\n",
        }))
      : [],
    externalOutreach: Array.isArray(data?.question31)
      ? data.question31.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
          Column5: (row["Column 5"] || "") + "\n",
          Column6: (row["Column 6"] || "") + "\n",
        }))
      : [],

    // Collaboration
    collaborations: Array.isArray(data?.question32)
      ? data.question32.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
          Column4: (row["Column 4"] || "") + "\n",
        }))
      : [],
    functions: Array.isArray(data?.question33)
      ? data.question33.map((row) => ({
          Column1: (row["Column 1"] || "") + "\n",
          Column2: (row["Column 2"] || "") + "\n",
          Column3: (row["Column 3"] || "") + "\n",
        }))
      : [],
  };

  // Render the document with the data
  doc.render(templateData);

  // Generate and download the document
  const generatedDoc = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  // Save the file
  saveAs(
    generatedDoc,
    `Faculty_Portfolio_${templateData.surname || "Unknown"}.docx`
  );
};
