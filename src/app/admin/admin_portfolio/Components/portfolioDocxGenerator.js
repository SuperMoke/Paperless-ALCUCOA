const docx = require("docx");
const {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  FrameAnchorType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  UnderlineType,
  WidthType,
  HorizontalPositionAlign,
  VerticalPositionAlign,
} = docx;
import { json } from "./json";

export const createPersonalPortfolio = (surveyData) => {
  function getDropdownText(value, questionName) {
    // Find the question in json configuration
    let question;
    for (const page of json.pages) {
      question = page.elements.find((q) => q.name === questionName);
      if (question) break;
    }

    // Find matching choice and return its text
    if (question && question.choices) {
      const choice = question.choices.find((c) => c.valueOf === value);
      return choice ? choice.text : value;
    }

    return value;
  }

  const DEFAULT_TABLE_STYLE = {
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
      insideVertical: { style: BorderStyle.SINGLE, size: 1 },
    },
    margins: {
      top: 100,
      bottom: 100,
      right: 100,
      left: 100,
    },
  };

  // Helper function to create section headers
  function createSectionHeader(text) {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: true,
          size: 28,
        }),
      ],
      spacing: {
        before: 400,
        after: 200,
      },
    });
  }

  // Helper function to create subsection headers
  function createSubsectionHeader(text) {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: true,
          size: 24,
        }),
      ],
      spacing: {
        before: 200,
        after: 200,
      },
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "PERSONAL PORTFOLIO FOR FACULTY",
                bold: true,
                size: 22,
                color: "000000",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            spacing: {
              before: 200,
              after: 200,
            },
            children: [
              new TextRun({
                text: "as of ",
                size: 22,
                color: "000000",
              }),
              new TextRun({
                text: new Date().toLocaleDateString(),
                italics: true,
                size: 22,
                color: "000000",
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),

          // Instructions paragraph
          new Paragraph({
            children: [
              new TextRun({
                text: "Accomplish this personal portfolio for faculty by providing the details of your performance and engagements as a faculty member of the College for the past three academic years in the following areas below. Please provide the required information and supporting documents for each item you indicate.",
              }),
            ],
          }),

          // Personal Information Section
          new Paragraph({
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: "PERSONAL INFORMATION",
                bold: true,
                size: 24,
              }),
            ],
            border: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
            padding: {
              left: 100,
              right: 100,
            },
          }),

          new Paragraph({
            spacing: {
              before: 200,
              after: 200,
            },
            children: [
              new TextRun(
                "Identify pertinent information below. Write N/A for items not applicable to you."
              ),
            ],
          }),

          // Personal Information Table
          new Table({
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE,
            },
            borders: {
              all: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Surname: " + surveyData.question1,
                      }),
                    ],
                    width: {
                      size: 33,
                      type: docx.WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Given Name: " + surveyData.question2,
                      }),
                    ],
                    width: {
                      size: 33,
                      type: docx.WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Middle Name: " + surveyData.question3,
                      }),
                    ],
                    width: {
                      size: 34,
                      type: docx.WidthType.PERCENTAGE,
                    },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Address: " + surveyData.question4,
                      }),
                    ],
                    columnSpan: 3,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Date of Birth: " + surveyData.question5,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Place of Birth: " + surveyData.question6,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Age: " + surveyData.question7 }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Contact No.: " + surveyData.question8,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "E-mail Address: " + surveyData.question9,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Sex: " + surveyData.question10,
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Civil Status: " + surveyData.question11,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Name of Spouse: " + surveyData.question12,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "No. of Children: " + surveyData.question13,
                      }),
                    ],
                  }),
                ],
              }),
            ],
            borders: {
              top: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              bottom: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              left: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              right: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              insideVertical: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
            },
          }),

          // Educational Attainment Section
          new Paragraph({
            children: [
              new TextRun({
                text: "A. EDUCATIONAL ATTAINMENT",
                bold: true,
              }),
            ],
            spacing: {
              before: 400,
              after: 200,
            },
          }),

          // Professional License subsection
          new Paragraph({
            children: [
              new TextRun({
                text: "1. Professional License",
                bold: true,
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "List down professional license and other government examinations passed. (Begin with the most recent)",
                italics: true,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),

          // Professional License Table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              // Header row
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Type of License" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date Acquired" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
              }),
              // Dynamic data rows
              ...(surveyData.question14 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
            borders: {
              top: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              bottom: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              left: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              right: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
              insideVertical: {
                style: BorderStyle.SINGLE,
                size: 1,
              },
            },
          }),

          // Degrees Obtained Table
          createSubsectionHeader("2. Degrees Obtained"),
          new Paragraph({
            children: [
              new TextRun({
                text: "Identify pertinent information below. List down the degrees obtained. (Begin with the most recent)  ",
                italics: true,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Degrees Earned" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Specialization" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "School" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Year Graduated" })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Academic Distinction/s" }),
                    ],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question15 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader("3. Degrees Obtained"),
          new Paragraph({
            children: [
              new TextRun({
                text: "List down the degree/s being pursued, if any. (Begin with the most recent).",
                italics: true,
              }),
            ],
            spacing: {
              before: 400,
              after: 200,
            },
          }),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Degrees Earned" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Specialization" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "School" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Year Attendance" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "No. of Units Earned	" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question16 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Work Experience Section
          createSectionHeader("B. WORK EXPERIENCE"),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "INCLUSIVE DATES (MM/DD/YYYY) FROM & TO",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "POSITION TITLE (WRITE IN FULL)" }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "DEPARTMENT/OFFICE/COMPANY" }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "STATUS OF APPOINTMENT" }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "GOVERNMENT SERVICE (YES/NO)" }),
                    ],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question17 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 5"], "question17") ||
                              "",
                          }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Innovation and Creative Works Section
          createSectionHeader("C. INNOVATION AND CREATIVE WORKS"),
          new Paragraph({
            children: [
              new TextRun({
                text: "Describe the innovation that you introduced in your class during the last three academic years.  Please describe in the third column the results/effects/impacts of the innovation in the quality of teaching-learning process. Also indicate whether the innovation is adopted by your program, your Institute or by the College. Include also the patents or copyrights you have obtained during the year and describe briefly their value to your program, your Institute or in the College.  Please indicate if such were used elsewhere outside the College. (Begin with the most recent) ",
                italics: true,
              }),
            ],
            spacing: {
              before: 400,
              after: 200,
            },
          }),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Innovation/Creative Work" }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Date Implemented/Utilized" }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Results/Effects/Impact" }),
                    ],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question18 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Patents/Copyrights" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date Obtained" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Value to the College" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question19 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Research and Publication Section
          createSectionHeader("D. RESEARCH AND PUBLICATION"),
          createSubsectionHeader("1. Published or Unpublished Work"),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Title of Paper" })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Authorship (Indicate sole authorship or co-authorship and the nature of participation in the work)",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Indicate whether published or unpublished",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Indicate where date and the name of journal where the work is published ",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Indicate if refereed" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question20 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 3"], "question20") ||
                              "",
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader("2. Paper or Project Presented"),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Title of Paper" })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Indicate the level of participation (in-house, city-wide, provincial, regional, national or international)",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Identify the Audience" }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date of Presentation	" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question21 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 2"], "question21") ||
                              "",
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 4"], "question21") ||
                              "",
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader("3. Membership in Editorial Board"),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Membership" })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Journal",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Scope of the Journal (in-house, city-wide, provincial, regional, national or international)	",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Indicate if refereed" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Inclusive Date" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question22 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 3"], "question22") ||
                              "",
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Personal and Professional Development Section
          createSectionHeader("E. PERSONAL AND PROFESSIONAL DEVELOPMENT"),
          createSubsectionHeader(
            "1. Continuing Professional Development Programs/Activities"
          ),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Activities/Projects/Programs/Seminars",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Indicate if, In-house, City-wide, Regional National, or International",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Sponsoring Organization" }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Inclusive Date" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question23 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 2"], "question23") ||
                              "",
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader(
            "2. Membership in Related Professional Organizations"
          ),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Name of Organization",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Position",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "State of In-House, City-wide, Regional, National or International",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Validity of Position 	" }),
                    ],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question24 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 3"], "question24") ||
                              "",
                          }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),
          createSubsectionHeader(
            "3. Linkages Initiated or Established for the Program/Institute/College"
          ),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Partner Institution",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Nature of Linkage",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Date Established",
                      }),
                    ],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question25 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader("4.  Speakership"),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Title",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Sponsoring Organization & Audience",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Date",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question26 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader(
            "5. Engagement in Accreditation or Certification of Other Educational Institutions  "
          ),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Accrediting or Certifying Organization",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "School Accredited or Certified",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Nature of Participation",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question27 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader("6. Awards or Recognitions Received "),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Name of Award or Recognition",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Conferring Organization",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "State if City-wide, Regional, National or International",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date Awarded" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question28 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 3"], "question28") ||
                              "",
                          }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),
          createSubsectionHeader("7. Organizing a Professional Forum "),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Title of the Forum",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Contribution",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "State if In-house, City-wide, Regional, National or International",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question29 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 3"], "question29") ||
                              "",
                          }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Community Outreach Activities Section
          createSectionHeader(
            "F. INVOLVEMENT IN COMMUNITY OUTREACH ACTIVITIES"
          ),
          createSubsectionHeader(
            "1. Involvement in the Community Outreach Activities of the Institute or the College"
          ),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Program/Projects" })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Nature of Participation" }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Duration" })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "State if College-mandated, Institute-mandated",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question30 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 4"], "question29") ||
                              "",
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 6"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),
          createSubsectionHeader(
            "2. Involvement in Outside Community Outreach Activities"
          ),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Program/Projects" })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Nature of Participation" }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Duration" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Beneficiaries" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Venue" })],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question31 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 5"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 6"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Collaboration & Teamwork Section
          createSectionHeader("G. COLLABORATION & TEAMWORK"),
          createSubsectionHeader("1. Collaboration and Teamwork"),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Name of Committee/Project/Activity (Indicate if program-based, Institute-based, or College-based)",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Nature of the Committee/Project/Activity",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Specific Contribution" }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Duration of the committee/project/activity",
                      }),
                    ],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question32 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            text:
                              getDropdownText(row["Column 1"], "question32") ||
                              "",
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 4"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          createSubsectionHeader("2. Collaboration and Teamwork"),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Program/Institute/College Functions Attended	",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Date",
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Venue",
                      }),
                    ],
                  }),
                ],
                tableHeader: true,
              }),
              ...(surveyData.question33 || []).map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 1"] || "" }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 2"] || "" }),
                        ],
                      }),

                      new TableCell({
                        children: [
                          new Paragraph({ text: row["Column 3"] || "" }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Signature Section
          new Paragraph({
            children: [new TextRun({ text: "" })],
            spacing: { before: 400, after: 400 },
          }),
          new Table({
            ...DEFAULT_TABLE_STYLE,
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Prepared by:" }),
                      new Paragraph({ text: "" }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Name of Faculty: " + surveyData.name,
                          }),
                          new TextRun({
                            text: "_____________________",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Signature: " }),
                          new TextRun({
                            text: "_____________________",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Date: " }),
                          new TextRun({
                            text: "_____________________",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "Noted by:" }),
                      new Paragraph({ text: "" }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text:
                              "Name of Institute Dean: " +
                              surveyData.instituteDean,
                          }),
                          new TextRun({
                            text: "_____________________",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Signature: " }),
                          new TextRun({
                            text: "_____________________",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Date: " }),
                          new TextRun({
                            text: "_____________________",
                            underline: { type: UnderlineType.SINGLE },
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  return doc;
};
