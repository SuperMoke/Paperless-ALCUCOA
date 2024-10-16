import React, { useState } from "react";
import { Typography, Radio, Card, Input } from "@material-tailwind/react";

export default function Faculty_Loading({ FacultyLoadingMean }) {
  const [inputValues, setInputValues] = useState(["", ""]);
  const [processValues, setProcessValues] = useState(["", "", "", "", ""]);
  const [outputValues, setOutputValues] = useState([""]);

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

  FacultyLoadingMean(totalWeightedMean);
  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">FACULTY LOADING</h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.The institution has clear policies on faculty loading that
            complies with the minimum requirements of the Commission on Higher
            Education in terms of the following:  Academic Qualifications 
            Field of Specialization  Number of Preparations  Number of Units
            of Teaching Loads; and Administrative Support.
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
            2.. The institutional system on faculty loading contains specific
            provisions for faculty with additional responsibilities which
            includes the following: a. Rewards b. Service credits c. Honorarium
            d. Points for promotions e. Ranking, recognitions
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
          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.Ratio of full time to part time faculty is 7 is to 3 as shown in
            the Summary of teaching assignment duly signed by the designated
            authority.
          </Typography>
          <Radio
            name="process1"
            label="1 - 30% of the faculty members are full-time teachers"
            onChange={() => handleRadioChange("1", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="2 - 40% of the faculty members are full-time teachers"
            onChange={() => handleRadioChange("2", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="3 - 50% of the faculty members are full-time teachers"
            onChange={() => handleRadioChange("3", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="4 - 60% of the faculty members are full-time teachers"
            onChange={() => handleRadioChange("4", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="5 - 70% of the faculty members are full-time teachers"
            onChange={() => handleRadioChange("5", "process", 0)}
          ></Radio>
          <Typography>
            2.The faculty members teach their major and minor fields of
            specialization.
          </Typography>
          <Radio
            name="process2"
            label="1 - 20% of the members of the faculty are given teaching
assignments only in their major and minor fields of
specialization."
            onChange={() => handleRadioChange("1", "process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="2 - 30% of the members of the faculty are given teaching
assignments only in their major and minor fields of
specialization."
            onChange={() => handleRadioChange("2process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="3 - 50%of the members of the faculty are given teaching
assignments only in their major and minor fields of
specialization."
            onChange={() => handleRadioChange("3", "process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="4 - 65%of the members of the faculty are given teaching 
assignments only in their major and minor fields of
specialization."
            onChange={() => handleRadioChange("4", "process", 1)}
          ></Radio>
          <Radio
            name="process2"
            label="5 - 75%of the members of the faculty are given teaching
assignments only in their major and minor fields of
specialization."
            onChange={() => handleRadioChange("5", "process", 1)}
          ></Radio>
          <Typography>
            3.Full-time faculty teaching load per week is in accordance with
            acceptable standards.
          </Typography>
          <Radio
            name="process3"
            label="1 - 10% of the faculty members have more than 30 units
maximum load"
            onChange={() => handleRadioChange("1", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="2 - 35% of the faculty members have 30 units maximum
load"
            onChange={() => handleRadioChange("2", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="3 - 50% of the faculty members have 27 units maximum
load"
            onChange={() => handleRadioChange("3", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="4 - 65% of the faculty members have 24 units maximum
load"
            onChange={() => handleRadioChange("4", "process", 2)}
          ></Radio>
          <Radio
            name="process3"
            label="5 - 75% of the faculty members have 21 units maximum
load"
            onChange={() => handleRadioChange("5", "process", 2)}
          ></Radio>
          <Typography>
            4.Faculty with concurrent or special designations are given the
            following rewards and incentives: a. Equivalent teaching units b.
            Service credits c. Honorarium d. Points for promotion, Ranking or
            recognitions.
          </Typography>
          <Radio
            name="process4"
            label="1 - no provision for incentives exhibited"
            onChange={() => handleRadioChange("1", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="2 - two of the mentioned items for incentives are present"
            onChange={() => handleRadioChange("2", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="3 - three of the mentioned items for incentives are present"
            onChange={() => handleRadioChange("3", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="4 - four of the mentioned items for incentives are present"
            onChange={() => handleRadioChange("4", "process", 3)}
          ></Radio>
          <Radio
            name="process4"
            label="5 - All of the mentioned items for incentives are present"
            onChange={() => handleRadioChange("5", "process", 3)}
          ></Radio>
          <Typography>
            5.Some faculty members are given special assignments such as: Page |
            39 a. Program/Project Coordinator/Member b. Chairmanship c. Student
            Organization Advisorship d. Other special tasks .
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
          <Typography>
            1.Faculty load complies with CHED requirements.
          </Typography>
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
          <Typography className="text-left text-2xl font-bold">
            Comments
          </Typography>
          <Input label="Best Practices"></Input>
        </Card>
      </div>
    </>
  );
}
