import React, { useState } from "react";
import { Card, Typography, Input, Radio } from "@material-tailwind/react";

export default function Professional_Performance_and_Scholarly_Work({
  ProfessionalMean,
}) {
  const [inputValues, setInputValues] = useState(["", ""]);
  const [processValues, setProcessValues] = useState([""]);
  const [outputValues, setOutputValues] = useState(["", ""]);

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

  ProfessionalMean(totalWeightedMean);

  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            PROFESSIONAL PERFORMANCE AND SCHOLARLY WORK
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.The institution has clear policies and programs on research that
            promotes research capability and engagements.
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
            2.The institution has specific budget for research such as: a.
            Incentives for research engagements; b. Support for research
            presentation; and c. Support for research publications.
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
            1.The institution provides support for research and publication
            through allocation of a budget for the following: a. Honorarium; b.
            Deloading; c. Service credits; and d. Seminars and trainings on
            research.
          </Typography>
          <Radio
            name="process1"
            label="1 - no support provided for research and publication"
            onChange={() => handleRadioChange("1", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="2 - one (1) of the mentioned support are provided"
            onChange={() => handleRadioChange("2", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="3 - two (2) of the mentioned supports are provided"
            onChange={() => handleRadioChange("3", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="4 - three (3) of the mentioned supports are provided"
            onChange={() => handleRadioChange("4", "process", 0)}
          ></Radio>
          <Radio
            name="process1"
            label="5 - all of the mentioned supports are provided"
            onChange={() => handleRadioChange("5", "process", 0)}
          ></Radio>
          <Typography className="text-left text-2xl font-bold">
            OUTPUT
          </Typography>
          <Typography>
            1.Faculty members have research output 1. Research Journal
            publication
          </Typography>
          <Radio
            name="output1"
            label="1 - The institution has an on-going research journal."
            onChange={() => handleRadioChange("1", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="2- The institution has a research journal but was not
published."
            onChange={() => handleRadioChange("2", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="3 - The institution has published one (1) or more research
journal in one academic year."
            onChange={() => handleRadioChange("3", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="4 - The institution has published two (2) research journals in
one academic year."
            onChange={() => handleRadioChange("4", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="5- The institution has published two (2) or more research
journal in one academic year."
            onChange={() => handleRadioChange("5", "output", 0)}
          ></Radio>
          <Typography>
            2.There are faculty members who published books or instructional
            material/s.
          </Typography>
          <Radio
            name="output2"
            label="1"
            onChange={() => handleRadioChange("1", "output", 1)}
          />
          <Radio
            name="output2"
            label="2"
            onChange={() => handleRadioChange("2", "output", 1)}
          />
          <Radio
            name="output2"
            label="3"
            onChange={() => handleRadioChange("3", "output", 1)}
          />
          <Radio
            name="output2"
            label="4"
            onChange={() => handleRadioChange("4", "output", 1)}
          />
          <Radio
            name="output2"
            label="5"
            onChange={() => handleRadioChange("5", "output", 1)}
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
