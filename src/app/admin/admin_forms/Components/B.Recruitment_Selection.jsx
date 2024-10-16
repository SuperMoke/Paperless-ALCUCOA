import React, { useState } from "react";
import { Card, Typography, Input, Radio } from "@material-tailwind/react";

export default function Recruitment_Selection({ RecruitmentMean }) {
  const [inputValues, setInputValues] = useState(["", ""]);
  const [processValues, setProcessValues] = useState(["", "", "", "", ""]);
  const [outputValues, setOutputValues] = useState(["", "", "", ""]);

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

  RecruitmentMean(totalWeightedMean);

  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            RECRUITMENT AND SELECTION
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.There are institutional policies on faculty selection as evidenced
            by the following documents: a. Qualification Standards b. Ranking
            and Promotion Plan c. Ranking instrument d. Personnel Selection
            Board e. Published Administrative Code, University/College Code/
            Manual of Regulations/ Faculty Manual, Flow Chart of HRMO
          </Typography>
          <Radio
            name="input1"
            label="1 - one (1) of the evidence are present"
            onChange={() => handleRadioChange("1", "input", 0)}
          />
          <Radio
            name="input1"
            label="2 - two (2) of the evidences are present"
            onChange={() => handleRadioChange("2", "input", 0)}
          />
          <Radio
            name="input1"
            label="3 - three (3) of the evidences are present"
            onChange={() => handleRadioChange("3", "input", 0)}
          />
          <Radio
            name="input1"
            label="4 - four (4) of the evidences are present  "
            onChange={() => handleRadioChange("4", "input", 0)}
          />
          <Radio
            name="input1"
            label="5 - all of the evidences are present"
            onChange={() => handleRadioChange("5", "input", 0)}
          />
          <Typography>
            2.The faculty selection board is composed of: 1. School Head or
            representative 2. Academic Head or representative 3. HR Officer 4.
            Faculty Representative 5. Dean or its equivalent
          </Typography>
          <Radio
            name="input2"
            label="1 - participated by any one (1) of the mentioned officials"
            onChange={() => handleRadioChange("1", "input", 1)}
          />
          <Radio
            name="input2"
            label="2 - participated by any of the two(2) of the mentioned
officials"
            onChange={() => handleRadioChange("2", "input", 1)}
          />
          <Radio
            name="input2"
            label="3 - participated by any of the three(3) of the mentioned
officials"
            onChange={() => handleRadioChange("3", "input", 1)}
          />
          <Radio
            name="input2"
            label="4 - participated by any of the four (4) of the mentioned
officials"
            onChange={() => handleRadioChange("4", "input", 1)}
          />
          <Radio
            name="input2"
            label="5 - participated by all of the mentioned officials "
            onChange={() => handleRadioChange("5", "input", 1)}
          />
          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.The minimum requirements of the Civil Service Commission and the
            University criteria/standards are taken into consideration in the
            recruitment, selection and hiring of faculty members.
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
          <Typography>
            2.The faculty selection process gives due consideration on the
            following: a. Academic qualification ( Education) b. Professional
            Licensure/Eligibility c. Teaching Experience d. Trainings and
            Seminars e. Professional Experience f. Teaching Competencies g. Oral
            and written communication h. Research capability i. Community
            Extension Activities j. Technical competencies, if applicable k.
            Character l. Personality m. Health
          </Typography>
          <Radio
            name="process2"
            label="1"
            onChange={() => handleRadioChange("1", "process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="2"
            onChange={() => handleRadioChange("2", "process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="3"
            onChange={() => handleRadioChange("3", "process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="4"
            onChange={() => handleRadioChange("4", "process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="5"
            onChange={() => handleRadioChange("5", "process", 1)}
          ></Radio>
          <Typography>
            3.The Local Chief Executive appoints all employees of the
            institution.
          </Typography>
          <Radio
            name="process3"
            label="1"
            onChange={() => handleRadioChange("1", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="2"
            onChange={() => handleRadioChange("2", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="3"
            onChange={() => handleRadioChange("3", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="4"
            onChange={() => handleRadioChange("4", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="5"
            onChange={() => handleRadioChange("5", "process", 2)}
          ></Radio>
          <Typography>
            4.The institution observes the criteria for recruitment, selection,
            and hiring.
          </Typography>
          <Radio
            name="process4"
            label="1"
            onChange={() => handleRadioChange("1", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="2"
            onChange={() => handleRadioChange("2", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="3"
            onChange={() => handleRadioChange("3", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="4"
            onChange={() => handleRadioChange("4", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="5"
            onChange={() => handleRadioChange("5", "process", 3)}
          ></Radio>
          <Typography>
            5.The institution implements employment policies.
          </Typography>
          <Radio
            name="process5"
            label="1"
            onChange={() => handleRadioChange("1", "process", 4)}
          ></Radio>
          <Radio
            name="process5"
            label="2"
            onChange={() => handleRadioChange("2", "process", 4)}
          ></Radio>
          <Radio
            name="process5"
            label="3"
            onChange={() => handleRadioChange("3", "process", 4)}
          ></Radio>
          <Radio
            name="process5"
            label="4"
            onChange={() => handleRadioChange("4", "process", 4)}
          ></Radio>
          <Radio
            name="process5"
            label="5"
            onChange={() => handleRadioChange("5", "process", 4)}
          ></Radio>
          <Typography className="text-left text-2xl font-bold">
            OUTPUT
          </Typography>
          <Typography>1.Presence of highly qualified applicants.</Typography>
          <Radio
            name="output1"
            label="1"
            onChange={() => handleRadioChange("1", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="2"
            onChange={() => handleRadioChange("2", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="3"
            onChange={() => handleRadioChange("3", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="4"
            onChange={() => handleRadioChange("4", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="5"
            onChange={() => handleRadioChange("5", "output", 0)}
          ></Radio>
          <Typography>2.Presence of functional faculty researchers.</Typography>
          <Radio
            name="output2"
            label="1"
            onChange={() => handleRadioChange("1", "output", 1)}
          ></Radio>
          <Radio
            name="output2"
            label="2"
            onChange={() => handleRadioChange("2", "output", 1)}
          ></Radio>
          <Radio
            name="output2"
            label="3"
            onChange={() => handleRadioChange("3", "output", 1)}
          ></Radio>
          <Radio
            name="output2"
            label="4"
            onChange={() => handleRadioChange("4", "output", 1)}
          ></Radio>
          <Radio
            name="output2"
            label="5"
            onChange={() => handleRadioChange("5", "output", 1)}
          ></Radio>
          <Typography>3.Competent faculty members were employed.</Typography>
          <Radio
            name="output3"
            label="1"
            onChange={() => handleRadioChange("1", "output", 2)}
          ></Radio>
          <Radio
            name="output3"
            label="2"
            onChange={() => handleRadioChange("2", "output", 2)}
          ></Radio>
          <Radio
            name="output3"
            label="3"
            onChange={() => handleRadioChange("3", "output", 2)}
          ></Radio>
          <Radio
            name="output3"
            label="4"
            onChange={() => handleRadioChange("4", "output", 2)}
          ></Radio>
          <Radio
            name="output3"
            label="5"
            onChange={() => handleRadioChange("5", "output", 2)}
          ></Radio>
          <Typography>
            4.Existence of Selection and Recruitment Policy.
          </Typography>
          <Radio
            name="output4"
            label="1"
            onChange={() => handleRadioChange("1", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="2"
            onChange={() => handleRadioChange("2", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="3"
            onChange={() => handleRadioChange("3", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="4"
            onChange={() => handleRadioChange("4", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="5"
            onChange={() => handleRadioChange("5", "output", 3)}
          ></Radio>
          <Typography className="text-left text-2xl font-bold">
            Comments
          </Typography>
          <Input label="Best Practices"></Input>
        </Card>
      </div>
    </>
  );
}
