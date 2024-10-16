import React, { useState } from "react";
import { Radio, Card, Typography, Input } from "@material-tailwind/react";

export default function Performance_Evaluation({ PerformanceMean }) {
  const [inputValues, setInputValues] = useState(["", "", ""]);
  const [processValues, setProcessValues] = useState([""]);
  const [outputValues, setOutputValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleRadioChange = (value, section, index) => {
    switch (section) {
      case "input":
        const updatedInputValues = [...inputValues];
        updatedInputValues[index] = value;
        setInputValues(updatedInputValues);
        break;
      case "process":
        const updatedProcessValues = [...processValues];
        updatedProcessValues[index] = value;
        setProcessValues(updatedProcessValues);
        break;
      case "output":
        const updatedOutputValues = [...outputValues];
        updatedOutputValues[index] = value;
        setOutputValues(updatedOutputValues);
        break;
      default:
        break;
    }
  };

  const inputSum = inputValues.reduce(
    (acc, val) => acc + parseInt(val || 0),
    0
  );
  const inputMean = inputSum / inputValues.length;
  const weightedInputMean = inputMean * 0.2;

  const processSum = processValues.reduce(
    (acc, val) => acc + parseInt(val || 0),
    0
  );
  const processMean = processSum / processValues.length;
  const weightedProcessMean = processMean * 0.3;

  const outputSum = outputValues.reduce(
    (acc, val) => acc + parseInt(val || 0),
    0
  );
  const outputMean = outputSum / outputValues.length;
  const weightedOutputMean = outputMean * 0.5;

  const totalWeightedMean =
    weightedInputMean + weightedProcessMean + weightedOutputMean;

  PerformanceMean(totalWeightedMean);

  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            PERFORMANCE EVALUATION
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.The institution has a system that: 1.1. Monitors submission of
            academic requirements such as syllabi, grades and the like 1.2.
            Monitors faculty participation in trainings, meetings and other
            institutional activities/ services.
          </Typography>
          <Radio
            name="input1"
            label="1"
            onChange={() => handleRadioChange("1", "input", 0)}
          />
          <Radio
            name="input1"
            label="2"
            onChange={() => handleRadioChange("2", "input", 0)}
          />
          <Radio
            name="input1"
            label="3"
            onChange={() => handleRadioChange("3", "input", 0)}
          />
          <Radio
            name="input1"
            label="4"
            onChange={() => handleRadioChange("4", "input", 0)}
          />
          <Radio
            name="input1"
            label="5"
            onChange={() => handleRadioChange("5", "input", 0)}
          />
          <Typography>
            2.There is provision for faculty evaluation by the students, peers,
            self and immediate superiors
          </Typography>
          <Radio
            name="input2"
            label="1"
            onChange={() => handleRadioChange("1", "input", 1)}
          />
          <Radio
            name="input2"
            label="2"
            onChange={() => handleRadioChange("2", "input", 1)}
          />
          <Radio
            name="input2"
            label="3"
            onChange={() => handleRadioChange("3", "input", 1)}
          />
          <Radio
            name="input2"
            label="4"
            onChange={() => handleRadioChange("4", "input", 1)}
          />
          <Radio
            name="input2"
            label="5"
            onChange={() => handleRadioChange("5", "input", 1)}
          />
          <Typography>
            3.There are professional involvement and training of faculty as
            evidenced by the following: a. Affiliation to professional
            organizations; b. Conduct of seminars and trainings; c.
            Participation in civic organizations; and d. Participation as
            Presenter/ Lecturer/ Facilitator/ Panelist/ Evaluator.
          </Typography>
          <Radio
            name="input3"
            label="1 - No evidence of professional involvement and trainings"
            onChange={() => handleRadioChange("1", "input", 2)}
          />
          <Radio
            name="input3"
            label="2 - One (1) of the evidences mentioned is present."
            onChange={() => handleRadioChange("2", "input", 2)}
          />
          <Radio
            name="input3"
            label="3 - Two (2) of the evidences mentioned are present."
            onChange={() => handleRadioChange("3", "input", 2)}
          />
          <Radio
            name="input3"
            label="4 - Three (3) of the evidences mentioned are present."
            onChange={() => handleRadioChange("4", "input", 2)}
          />
          <Radio
            name="input3"
            label="5 - All of the evidences mentioned are present."
            onChange={() => handleRadioChange("5", "input", 2)}
          />
          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.The institution regularly conducts performance evaluation of
            faculty members using standardized instrument duly understood by the
            faculty that includes teaching competencies, research and community
            involvement.
          </Typography>
          <Radio
            name="process1"
            label="1"
            onChange={() => handleRadioChange("1", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="2"
            onChange={() => handleRadioChange("2", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="3"
            onChange={() => handleRadioChange("3", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="4"
            onChange={() => handleRadioChange("4", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="5"
            onChange={() => handleRadioChange("5", "process", 0)}
          ></Radio>
          <Typography className="text-left text-2xl font-bold">
            OUTPUT
          </Typography>
          <Typography>
            1.Attitudes and values of the faculty members are demonstrated in
            the following: a. Strict adherence to policies, rules and
            regulations and protocol; b. Punctuality; c. Courtesy; d.
            Participation to school activities/ meetings; and e. Initiative in
            organizing programs and projects.
          </Typography>
          <Radio
            name="output1"
            label="1 - One (1) of the items mentioned is demonstrated."
            onChange={() => handleRadioChange("1", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="2 - Two (2) of the items mentioned are demonstrated."
            onChange={() => handleRadioChange("2", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="3 - Three (3) of the items mentioned are demonstrated."
            onChange={() => handleRadioChange("3", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="4 - Four (4) of the items mentioned are demonstrated."
            onChange={() => handleRadioChange("4", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="5 - All of the items mentioned are demonstrated."
            onChange={() => handleRadioChange("5", "output", 0)}
          ></Radio>
          <Typography>
            2.Compliance with administrative requirements are evident in the
            following submissions: a. Submission of syllabi; b. Table of
            specifications; c. Test questions with answer key; d. Monthly
            attendance of students before the specified date of submission; and
            e. Grades and other academic reports.
          </Typography>
          <Radio
            name="output2"
            label="1 - One (1) of the items mentioned is complied. "
            onChange={() => handleRadioChange("1", "output", 1)}
          />
          <Radio
            name="output2"
            label="2 - Two (2) of the items mentioned are complied."
            onChange={() => handleRadioChange("2", "output", 1)}
          />
          <Radio
            name="output2"
            label="3 - Three (3) of the items mentioned are complied."
            onChange={() => handleRadioChange("3", "output", 1)}
          />
          <Radio
            name="output2"
            label="4 - Four (4) of the items mentioned are complied."
            onChange={() => handleRadioChange("4", "output", 1)}
          />
          <Radio
            name="output2"
            label="5 - All of the items mentioned are complied"
            onChange={() => handleRadioChange("5", "output", 1)}
          />
          <Typography>
            3.The teachers instructional materials and references are: Page | 44
            a. updated; b. well-researched materials; c. variety of sources; d.
            innovative resources; and e. supplementary materials.
          </Typography>
          <Radio
            name="output3"
            label="1 - One (1) of the criteria mentioned is observed. "
            onChange={() => handleRadioChange("1", "output", 2)}
          />
          <Radio
            name="output3"
            label="2 - Two (3) of the criteria mentioned are observed."
            onChange={() => handleRadioChange("2", "output", 2)}
          />
          <Radio
            name="output3"
            label="3 - Three (3) of the criteria mentioned are observed."
            onChange={() => handleRadioChange("3", "output", 2)}
          />
          <Radio
            name="output3"
            label="4 - Four (4) of the criteria mentioned are observed."
            onChange={() => handleRadioChange("4", "output", 2)}
          />
          <Radio
            name="output3"
            label="5 - All of the criteria mentioned are observed."
            onChange={() => handleRadioChange("5", "output", 2)}
          />
          <Typography>
            4.Mastery of the subject matter as evidenced by the following: a.
            There is a wide range of knowledge of the topic; b. Information
            related to the topic are updated; c. References are complete; and d.
            High degree of fluency originality and confidence are demonstrated.
          </Typography>
          <Radio
            name="output4"
            label="1 - No evidence of mastery of the subject matter is
observed. "
            onChange={() => handleRadioChange("1", "output", 3)}
          />
          <Radio
            name="output4"
            label="2 -One (1) of the evidences mentioned is observed."
            onChange={() => handleRadioChange("2", "output", 3)}
          />
          <Radio
            name="output4"
            label="3- Two (2) of the evidences mentioned are observed."
            onChange={() => handleRadioChange("3", "output", 3)}
          />
          <Radio
            name="output4"
            label="4 -Three (3) of the evidences mentioned are observed."
            onChange={() => handleRadioChange("4", "output", 3)}
          />
          <Radio
            name="output4"
            label="5 -All of the evidences mentioned are observed."
            onChange={() => handleRadioChange("5", "output", 3)}
          />
          <Typography>
            5.Class Preparation as evidenced in the following: a. Personality
            and physical appearance; b. Punctuality and attendance; c.
            Possession of tools and supplies; and d. Use of appropriate
            instructional materials/technology needed and basic knowledge on
            their use.
          </Typography>
          <Radio
            name="output5"
            label="1 - There is no evidence of class preparation on the part of
the teacher."
            onChange={() => handleRadioChange("1", "output", 4)}
          />
          <Radio
            name="output5"
            label="2 - One (1) of the evidence mentioned is observed."
            onChange={() => handleRadioChange("2", "output", 4)}
          />
          <Radio
            name="output5"
            label="3 - Two (2) of the evidences mentioned are observed."
            onChange={() => handleRadioChange("3", "output", 4)}
          />
          <Radio
            name="output5"
            label="4 - Three (3) of the evidences mentioned are observed."
            onChange={() => handleRadioChange("4", "output", 4)}
          />
          <Radio
            name="output5"
            label="5 - All of the evidences mentioned are observed."
            onChange={() => handleRadioChange("5", "output", 4)}
          />
          <Typography>
            6.Teaching competence can be seen in: Accomplishment of program and
            course objectives as indicated in the syllabi with expected student
            outcome/s.
          </Typography>
          <Radio
            name="output6"
            label="1 – Program and course objectives specified in the syllabi
are not met and inconsistent."
            onChange={() => handleRadioChange("1", "output", 5)}
          />
          <Radio
            name="output6"
            label="2 – Program and course objective are met but inconsistent
with the syllabi."
            onChange={() => handleRadioChange("2", "output", 5)}
          />
          <Radio
            name="output6"
            label="3 – Program and course objectives are met and show
minimal consistency with the syllabi"
            onChange={() => handleRadioChange("3", "output", 5)}
          />
          <Radio
            name="output6"
            label="4 - Accomplishment of program and course objective is
exceeded and consistent with the syllabi as shown by:
a. Objectives appropriately focus on content
b. Objectives focus on disciplinary skill and
development
c. Course activities are part of the class and aligned to
achieve course objectives"
            onChange={() => handleRadioChange("4", "output", 5)}
          />
          <Radio
            name="output6"
            label="5 - Accomplishment of program and course objective is far
exceeded, and consistent with the syllabi as shown by:
a. Creation of multiple opportunities for students to
interact and share ideas
b. Objectives, learning activities and assessments are
aligned and support each other
c. Objectives of learning outcomes were the central
element of the presentation and discussion
d. Designed elements are appropriately adopted to the
course level, size and position within the curriculum
and characteristics of students in the class"
            onChange={() => handleRadioChange("5", "output", 5)}
          />
          <Typography>7.Academic requirements submitted.</Typography>
          <Radio
            name="output7"
            label="1- Below 25% of the faculty members submits academic
requirements on time"
            onChange={() => handleRadioChange("1", "output", 6)}
          />
          <Radio
            name="output7"
            label="2- 25% of the faculty members submits academic
requirements on time"
            onChange={() => handleRadioChange("2", "output", 6)}
          />
          <Radio
            name="output7"
            label="3- 50% of the faculty members submits academic
requirements on time"
            onChange={() => handleRadioChange("3", "output", 6)}
          />
          <Radio
            name="output7"
            label="4- 75% of the faculty members submits academic
requirements on time"
            onChange={() => handleRadioChange("4", "output", 6)}
          />
          <Radio
            name="output7"
            label="5- 100% of the faculty members submits academic
requirement on time"
            onChange={() => handleRadioChange("5", "output", 6)}
          />
          <Typography>
            8.Participated in trainings, seminars, meeting and other
            institutional activities or services.
          </Typography>
          <Radio
            name="output8"
            label="1- Below 25% of the faculty members participated"
            onChange={() => handleRadioChange("1", "output", 7)}
          />
          <Radio
            name="output8"
            label="2- 25% of the faculty members participated"
            onChange={() => handleRadioChange("2", "output", 7)}
          />
          <Radio
            name="output8"
            label="3- 50% of the faculty members participated"
            onChange={() => handleRadioChange("3", "output", 7)}
          />
          <Radio
            name="output8"
            label="4- 75% of the faculty members participated"
            onChange={() => handleRadioChange("4", "output", 7)}
          />
          <Radio
            name="output8"
            label="5- 100% of the faculty members participated"
            onChange={() => handleRadioChange("5", "output", 7)}
          />
          <Typography>
            9.Demonstrate excellent instructional competence as shown by: a.
            submission of academic requirements such as syllabi, grades and the
            like. b. attendance in training, seminar and meeting obtained. c.
            faculty members obtained at least very satisfactory (VS) performance
            rating or higher. d. no derogatory records as evidenced by pending
            or decided cases.
          </Typography>
          <Radio
            name="output9"
            label="1- Below 25% demonstrated excellent instructional
competence"
            onChange={() => handleRadioChange("1", "output", 8)}
          />
          <Radio
            name="output9"
            label="2- 25% demonstrated excellent instructional competence"
            onChange={() => handleRadioChange("2", "output", 8)}
          />
          <Radio
            name="output9"
            label="3- 50% demonstrated excellent instructional competence"
            onChange={() => handleRadioChange("3", "output", 8)}
          />
          <Radio
            name="output9"
            label="4- 75% demonstrated excellent instructional competence"
            onChange={() => handleRadioChange("4", "output", 8)}
          />
          <Radio
            name="output9"
            label="5- 100% demonstrated excellent instructional competence"
            onChange={() => handleRadioChange("5", "output", 8)}
          />

          <Typography className="text-left text-2xl font-bold">
            Comments
          </Typography>
          <Input label="Best Practices"></Input>
        </Card>
      </div>
    </>
  );
}
