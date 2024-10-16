import React, { useState } from "react";
import { Card, Typography, Input, Radio } from "@material-tailwind/react";

export default function Ranking_Promotion({ RankingMean }) {
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [processValues, setProcessValues] = useState([""]);
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

  RankingMean(totalWeightedMean);

  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            RANKING AND PROMOTION
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.There is a faculty ranking and promotion system used by the
            institution.
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
            2.There is a career pathing and succession plan for the faculty
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
            3.The length of the probationary period is in accordance to Civil
            Service Commission standards
          </Typography>
          <Radio
            name="input3"
            label="1 - CSC standards not implemented"
            onChange={() => handleRadioChange("1", "input", 2)}
          />
          <Radio
            name="input3"
            label="2 - CSC standards are partially implemented"
            onChange={() => handleRadioChange("2", "input", 2)}
          />
          <Radio
            name="input3"
            label="3 - CSC standards are moderately implemented "
            onChange={() => handleRadioChange("3", "input", 2)}
          />
          <Radio
            name="input3"
            label="4 - CSC standards are mostly implemented"
            onChange={() => handleRadioChange("4", "input", 2)}
          />
          <Radio
            name="input3"
            label="5 - CSC standards are strictly implemented"
            onChange={() => handleRadioChange("5", "input", 2)}
          />
          <Typography>
            4.There are procedures for the termination of employment. As
            indicated in the Administrative Code, Faculty Manual and other
            supporting details
          </Typography>
          <Radio
            name="input4"
            label="1 - The institution does not observe and implement no
functional procedures for the termination of
employment."
            onChange={() => handleRadioChange("1", "input", 3)}
          />
          <Radio
            name="input4"
            label="2 - The institution partially observes and implements
functional procedures for the termination of
employment."
            onChange={() => handleRadioChange("2", "input", 3)}
          />
          <Radio
            name="input4"
            label="3 -The institution moderately observes and implements
functional procedures for the termination of
employment."
            onChange={() => handleRadioChange("3", "input", 3)}
          />
          <Radio
            name="input4"
            label="4 - The institution mostly observes and implements
functional procedures for the termination of
employment."
            onChange={() => handleRadioChange("4", "input", 3)}
          />
          <Radio
            name="input4"
            label="5 – The institution strictly observes and implements
functional procedures for the termination of
employment."
            onChange={() => handleRadioChange("5", "input", 3)}
          />
          <Typography>
            5.There are procedures for the dismissal of faculty including due
            process.
          </Typography>
          <Radio
            name="input5"
            label="1 - The institution does not observe and implement
functional procedures for dismissal of faculty including due
process"
            onChange={() => handleRadioChange("1", "input", 4)}
          />
          <Radio
            name="input5"
            label="2 - The institution partially observes and implements
functional procedures for dismissal of faculty including due
process."
            onChange={() => handleRadioChange("2", "input", 4)}
          />
          <Radio
            name="input5"
            label="3 - The institution moderately observes and implements
functional procedures for the dismissal of faculty including
due process."
            onChange={() => handleRadioChange("3", "input", 4)}
          />
          <Radio
            name="input5"
            label="4 - The institution mostly observes and implements
functional procedures for the dismissal of faculty including
due process."
            onChange={() => handleRadioChange("4", "input", 4)}
          />
          <Radio
            name="input5"
            label="5 - The institution strictly observes and implements
functional procedures for the dismissal of faculty including
due process."
            onChange={() => handleRadioChange("5", "input", 4)}
          />
          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.Institutionalization of the following: a. Merit, Ranking and
            Promotion Plan b. Career Pathing Plan c. Succession Plan
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
            1.List of promoted and regularized faculty members.
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
          <Typography>2.Due process observed.</Typography>
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
          <Typography>3.Low rate of faculty turnover.</Typography>
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
          <Typography>4.Career Pathing and Succession Plan.</Typography>
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
