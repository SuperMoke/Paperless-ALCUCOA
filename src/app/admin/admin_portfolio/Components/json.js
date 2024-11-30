export const json = {
  title: "PERSONAL PORTFOLIO FOR FACULTY",
  description:
    "Accomplish this personal portfolio for faculty by providing the details of your performance and engagements as a faculty member of the College for the past three academic years in the following areas below. Please provide the required information and supporting documents for each item you indicate.  ",
  completedHtml: "<h1>Thank You</h1>",
  pages: [
    {
      name: "page1",
      title: "Personal Information",
      description:
        "Identify pertinent information below. Write N/A for items not applicable to you. ",
      elements: [
        {
          type: "text",
          name: "question1",
          title: "Surname",
        },
        {
          type: "text",
          name: "question2",
          title: "Given Name",
        },
        {
          type: "text",
          name: "question3",
          title: "Middle Name",
        },
        {
          type: "text",
          name: "question4",
          title: "Address",
        },
        {
          type: "text",
          name: "question5",
          title: "Date Of Birth",
          inputType: "date",
        },
        {
          type: "text",
          name: "question6",
          title: "Place Of Birth",
        },
        {
          type: "text",
          name: "question7",
          title: "Age",
          inputType: "number",
        },
        {
          type: "text",
          name: "question8",
          title: "Contact No.",
          inputType: "tel",
        },
        {
          type: "text",
          name: "question9",
          title: "Email Address",
          inputType: "email",
        },
        {
          type: "dropdown",
          name: "question10",
          title: "Sex",
          choices: ["Male", "Female"],
        },
        {
          type: "dropdown",
          name: "question11",
          title: "Civil Status",
          choices: ["Single", "Married", "Widowed", "Separated"],
        },
        {
          type: "text",
          name: "question12",
          title: "Name of Spouse",
        },
        {
          type: "text",
          name: "question13",
          title: "No. of Children",
        },
      ],
    },
    {
      name: "page2",
      title: "Educational Attainment",
      elements: [
        {
          type: "matrixdynamic",
          name: "question14",
          title: "Professional License",
          description:
            "List down professional license and other government examinations passed. (Begin with the most recent)  ",
          columns: [
            {
              name: "Column 1",
              title: "Type of License",
            },
            {
              name: "Column 2",
              title: "Date Acquired",
            },
            {
              name: "Column 3",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question15",
          title: "Degrees Obtained",
          description:
            "Identify pertinent information below. List down the degrees obtained. (Begin with the most recent)  ",
          columns: [
            {
              name: "Column 1",
              title: "Degrees Earned",
            },
            {
              name: "Column 2",
              title: "Specialization",
            },
            {
              name: "Column 3",
              title: "School",
            },
            {
              name: "Column 4",
              title: "Year Graduated",
            },
            {
              name: "Column 5",
              title: "Academic Distinction/s",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question16",
          title: "Degrees being Pursued",
          description:
            "List down the degree/s being pursued, if any. (Begin with the most recent).",
          columns: [
            {
              name: "Column 1",
              title: "Degrees Earned",
            },
            {
              name: "Column 2",
              title: "Specialization",
            },
            {
              name: "Column 3",
              title: "School",
            },
            {
              name: "Column 4",
              title: "Year Attendance",
            },
            {
              name: "Column 5",
              title: "No. of Units Earned",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
      ],
    },
    {
      name: "page3",
      title: "Work Experience",
      elements: [
        {
          type: "matrixdynamic",
          name: "question17",
          title: "Work Experience",
          columns: [
            {
              name: "Column 1",
              title: "INCLUSIVE DATES (MM/DD/YYYY) FROM & TO",
            },
            {
              name: "Column 2",
              title: "POSITION TITLE (WRITE IN FULL)",
            },
            {
              name: "Column 3",
              title: "DEPARTMENT/OFFICE COMPANY",
            },
            {
              name: "Column 4",
              title: "STATUS OF APPOINTMENT",
            },
            {
              name: "Column 5",
              title: "GOVERNMENT SERVICE (YES/NO)",
              cellType: "dropdown",
              choices: ["Yes", "No"],
              storeOthersAsComment: true,
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
      ],
    },
    {
      name: "page4",
      title: "Innovation and Creative Works",
      description:
        "Describe the innovation that you introduced in your class during the last three academic years.  Please describe in the third column the results/effects/impacts of the innovation in the quality of teaching-learning process. Also indicate whether the innovation is adopted by your program, your Institute or by the College. Include also the patents or copyrights you have obtained during the year and describe briefly their value to your program, your Institute or in the College.  Please indicate if such were used elsewhere outside the College. (Begin with the most recent)  ",
      elements: [
        {
          type: "matrixdynamic",
          name: "question18",
          title: "Innovation and Creative Works",
          columns: [
            {
              name: "Column 1",
              title: "Innovation/Creative Work",
            },
            {
              name: "Column 2",
              title: "Date Implemented/Utilized",
            },
            {
              name: "Column 3",
              title: "Results /Effects/Impact",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question19",
          title: "Innovation and Creative Works",
          columns: [
            {
              name: "Column 1",
              title: "Patents/Copyrights",
            },
            {
              name: "Column 2",
              title: "Date Obtained",
            },
            {
              name: "Column 3",
              title: "Value to the College",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
      ],
    },
    {
      name: "page5",
      title: "Research and Publication",
      description:
        "Indicate your researches, publication, or unpublished work.  (Begin with the most recent)  ",
      elements: [
        {
          type: "matrixdynamic",
          name: "question20",
          title: "Published or Unpublished Work",
          columns: [
            {
              name: "Column 1",
              title: "Title of Paper",
            },
            {
              name: "Column 2",
              title:
                "Authorship  (Indicate sole authorship or co-authorship and the nature of participation in the work)",
            },
            {
              name: "Column 3",
              title: "Indicate whether published or unpublished",
              cellType: "dropdown",
              choices: ["Published", "Unpublished"],
              storeOthersAsComment: true,
            },
            {
              name: "Column 4",
              title:
                "Indicate where date and the name of journal where the work is published ",
            },
            {
              name: "Column 5",
              title: "Indicate if refereed",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question21",
          title: "Paper or Project Presented",
          columns: [
            {
              name: "Column 1",
              title: "Title of Paper",
            },
            {
              name: "Column 2",
              title:
                "Indicate the level of participation (in-house, city-wide, provincial, regional, national or international)",
              cellType: "dropdown",
              choices: [
                "In-House",
                "City-Wide",
                "Provincial",
                "Regional",
                "National",
                "International",
              ],
              storeOthersAsComment: true,
            },
            {
              name: "Column 3",
              title: "Identify the Audience ",
            },
            {
              name: "Column 4",
              title: "Date of Presentation",
            },
            {
              name: "Column 5",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question22",
          title: "Membership in Editorial Board",
          columns: [
            {
              name: "Column 1",
              title: "Membership",
            },
            {
              name: "Column 2",
              title: "Journal",
            },
            {
              name: "Column 3",
              title:
                "Scope of the Journal (in-house, city-wide, provincial, regional, national or international)",
              cellType: "dropdown",
              choices: [
                "In-House",
                "City-Wide",
                "Provincial",
                "Regional",
                "National",
                "International",
              ],
              storeOthersAsComment: true,
            },
            {
              name: "Column 4",
              title: "Indicate if refereed",
            },
            {
              name: "Column 5",
              title: "Inclusive Date",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
      ],
    },
    {
      name: "page6",
      title: "Personal and Professional Development",
      description:
        "Indicate personal and professional involvement you had directly related to your field of specialization. (Begin with the most recent)  ",
      elements: [
        {
          type: "matrixdynamic",
          name: "question23",
          title: "Continuing Professional Development Programs/Activities  ",
          columns: [
            {
              name: "Column 1",
              title: "Activities/Projects/Programs/Seminars",
            },
            {
              name: "Column 2",
              title:
                "Indicate if, In-house, City-wide, Regional National, or International",
              cellType: "dropdown",
              choices: [
                "In-House",
                "City-Wide",
                "Regional",
                "National",
                "International",
              ],
              storeOthersAsComment: true,
            },
            {
              name: "Column 3",
              title: "Sponsoring Organization",
            },
            {
              name: "Column 4",
              title: "Inclusive Date",
            },
            {
              name: "Column 5",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question24",
          title: "Membership in Related Professional Organizations",
          columns: [
            {
              name: "Column 1",
              title: "Name of Organization",
            },
            {
              name: "Column 2",
              title: "Position",
            },
            {
              name: "Column 3",
              title:
                "State of In-House, City-wide, Regional, National or International",
              cellType: "dropdown",
              choices: [
                "In-House",
                "City-Wide",
                "Regional",
                "National",
                "International",
              ],
              storeOthersAsComment: true,
            },
            {
              name: "Column 4",
              title: "Validity of Position ",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question25",
          title:
            "Linkages Initiated or Established for the Program/Institute/College",
          columns: [
            {
              name: "Column 1",
              title: "Partner Institution",
            },
            {
              name: "Column 2",
              title: "Nature of Linkage",
            },
            {
              name: "Column 3",
              title: "Date Established",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question26",
          title: "Speakership",
          columns: [
            {
              name: "Column 1",
              title: "Title",
            },
            {
              name: "Column 2",
              title: "Sponsoring Organization & Audience",
            },
            {
              name: "Column 3",
              title: "Date",
            },
            {
              name: "Column 4",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question27",
          title:
            "Engagement in Accreditation or Certification of Other Educational Institutions  ",
          columns: [
            {
              name: "Column 1",
              title: "Accrediting or Certifying Organization",
            },
            {
              name: "Column 2",
              title: "School Accredited or Certified",
            },
            {
              name: "Column 3",
              title: "Nature of Participation",
            },
            {
              name: "Column 4",
              title: "Date",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question28",
          title: "Awards or Recognitions Received ",
          columns: [
            {
              name: "Column 1",
              title: "Name of Award or Recognition",
            },
            {
              name: "Column 2",
              title: "Conferring Organization",
            },
            {
              name: "Column 3",
              title: "State if City-wide, Regional, National or International",
              cellType: "dropdown",
              choices: ["City-Wide", "Regional", "National", "International"],
              storeOthersAsComment: true,
            },
            {
              name: "Column 4",
              title: "Date Awarded",
            },
            {
              name: "Column 5",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question29",
          title: "Organizing a Professional Forum ",
          columns: [
            {
              name: "Column 1",
              title: "Title of the Forum",
            },
            {
              name: "Column 2",
              title: "Contribution",
            },
            {
              name: "Column 3",
              title:
                "State if In-house, City-wide, Regional, National or International",
              cellType: "dropdown",
              choices: [
                "In-House",
                "City-Wide",
                "Regional",
                "National",
                "International",
              ],
              storeOthersAsComment: true,
            },
            {
              name: "Column 4",
              title: "Date",
            },
            {
              name: "Column 5",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
      ],
    },
    {
      name: "page7",
      title: "Involvement in Community Outreach Activities",
      description:
        "Describe your involvement in the community outreach activities of the college during the last three academic years.  (Begin with the most recent)  ",
      elements: [
        {
          type: "matrixdynamic",
          name: "question30",
          title:
            "Involvement in the Community Outreach Activities of the Institute or the College ",
          columns: [
            {
              name: "Column 1",
              title: "Program/Projects",
            },
            {
              name: "Column 2",
              title: "Nature of Participation",
            },
            {
              name: "Column 3",
              title: "Duration",
              cellType: "text",
            },
            {
              name: "Column 4",
              title: "State if College-mandated, Institute-mandated",
              cellType: "dropdown",
              choices: ["College-Mandated", "Institute-Mandated"],
              storeOthersAsComment: true,
            },
            {
              name: "Column 5",
              title: "Date",
            },
            {
              name: "Column 6",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question31",
          title: "Involvement in Outside Community Outreach Activities  ",
          columns: [
            {
              name: "Column 1",
              title: "Program/Projects",
            },
            {
              name: "Column 2",
              title: "Nature of Participation",
            },
            {
              name: "Column 3",
              title: "Duration",
              cellType: "text",
            },
            {
              name: "Column 4",
              title: "Beneficiaries",
              cellType: "text",
            },
            {
              name: "Column 5",
              title: "Date",
            },
            {
              name: "Column 6",
              title: "Venue",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
      ],
    },
    {
      name: "page8",
      title: "Collaboration & Teamwork",
      description:
        "Indicate membership and involvement in committees, teams, projects or any collaborative involvement that you have had in the past three academic years.  Include also your attendance in official school functions and college meetings. (Begin with the most recent)  ",
      elements: [
        {
          type: "matrixdynamic",
          name: "question32",
          title: "Collaboration and Teamwork",
          columns: [
            {
              name: "Column 1",
              title:
                "Name of Committee/Project/Activity (Indicate if program-based, Institute-based, or College-based)",
              cellType: "dropdown",
              choices: ["Program-Based", "Institute-Based", "College-Based"],
              storeOthersAsComment: true,
            },
            {
              name: "Column 2",
              title: "Nature of the Committee/Project/Activity",
            },
            {
              name: "Column 3",
              title: "Specific Contribution",
              cellType: "text",
            },
            {
              name: "Column 4",
              title: "Duration of the committee/project/activity",
              cellType: "text",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
        {
          type: "matrixdynamic",
          name: "question33",
          title: "Collaboration and Teamwork",
          columns: [
            {
              name: "Column 1",
              title: "Program/Institute/College Functions Attended",
              cellType: "text",
            },
            {
              name: "Column 2",
              title: "Date",
            },
            {
              name: "Column 3",
              title: "Venue",
              cellType: "text",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "text",
        },
      ],
    },
  ],
  showTitle: false,
  questionsOnPageMode: "singlePage",
};
