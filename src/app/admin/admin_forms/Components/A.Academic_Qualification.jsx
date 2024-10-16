"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Radio,
  Input,
  input,
} from "@material-tailwind/react";

export default function Academic_Qualification({ AcademicMean }) {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [processValues, setProcessValues] = useState(["", ""]);
  const [outputValues, setOutputValues] = useState(["", "", ""]);

  useEffect(() => {
    const storedInputValues = JSON.parse(
      localStorage.getItem("inputValues")
    ) || ["", "", "", ""];
    const storedProcessValues = JSON.parse(
      localStorage.getItem("processValues")
    ) || ["", ""];
    const storedOutputValues = JSON.parse(
      localStorage.getItem("outputValues")
    ) || ["", "", ""];

    console.log(inputValues, processValues, outputValues);

    setInputValues(storedInputValues);
    setProcessValues(storedProcessValues);
    setOutputValues(storedOutputValues);
  }, []);

  useEffect(() => {
    localStorage.setItem("inputValues", JSON.stringify(inputValues));
    localStorage.setItem("processValues", JSON.stringify(processValues));
    localStorage.setItem("outputValues", JSON.stringify(outputValues));
  }, [inputValues, processValues, outputValues]);

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

  AcademicMean(totalWeightedMean);

  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            ACADEMIC FACULTY QUALIFICATIONS AND TEACHING EXPERIENCES
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.Faculty members teaching general education courses are master’s
            degree graduates.
          </Typography>
          <div>
            <Radio
              name="input1"
              label="1 - Less than 20% of the faculty members teaching general
education courses are Master’s degree holders"
              checked={inputValues[0] === "1"}
              onChange={() => handleRadioChange("1", "input", 0)}
            />
            <Radio
              name="input1"
              label="2 - 40% of the faculty members teaching general education
courses are Master’s degree holders or 30% are
Master’s degree holders and 20% are finishing within
one (1) year."
              checked={inputValues[0] === "2"}
              onChange={() => handleRadioChange("2", "input", 0)}
            />
            <Radio
              name="input1"
              label="3 - 60% of the faculty members teaching general education
courses are Master’s degree holders or 40% are
Master’s degree holders and 30% are finishing within
one (1) year."
              checked={inputValues[0] === "3"}
              onChange={() => handleRadioChange("3", "input", 0)}
            />
            <Radio
              name="input1"
              label="4 - 80% of the faculty members teaching general
education courses are Master’s degree holders "
              checked={inputValues[0] === "4"}
              onChange={() => handleRadioChange("4", "input", 0)}
            />
            <Radio
              name="input1"
              label="5 - 100% of the faculty members teaching general
education courses are Master’s degree holders"
              checked={inputValues[0] === "5"}
              onChange={() => handleRadioChange("5", "input", 0)}
            />
          </div>
          <Typography>
            2.Faculty members who teach major courses possess appropriate
            graduate/post graduate degree qualifications.
          </Typography>
          <div>
            <Radio
              name="input2"
              label="1 - Lower than 20% of the faculty are MA degree holder,
with at least 1 relevant training and seminar"
              onChange={() => handleRadioChange("1", "input", 1)}
            />
            <Radio
              name="input2"
              label="2 - 40 % of the faculty are MA degree holder, with at least 1
relevant training and seminar"
              onChange={() => handleRadioChange("2", "input", 1)}
            />
            <Radio
              name="input2"
              label="3 - 60% MA degree holder, with at least 2 or more relevant
trainings and seminars"
              onChange={() => handleRadioChange("3", "input", 1)}
            />
            <Radio
              name="input2"
              label="4 - 80% possess appropriate graduate/postgraduate
degree qualifications. (MA or doctorate degree,
minimum two (2) years industry experience, with at least
2 or more relevant trainings and seminars annually)"
              onChange={() => handleRadioChange("4", "input", 1)}
            />
            <Radio
              name="input2"
              label="5 -100% possess appropriate graduate/postgraduate
degree qualifications.(MA or doctorate degree, minimum
two (2) years industry experience, with at least 2 or
more relevant trainings and seminars annually)"
              onChange={() => handleRadioChange("5", "input", 1)}
            />
          </div>
          <Typography>
            3.Faculty members possess extensive teaching experience and/or
            industry practice in their fields of specialization.
          </Typography>
          <Radio
            name="input3"
            label="1 - Less than 30% of the faculty have 1 year teaching
experience/industry practice"
            onChange={() => handleRadioChange("1", "input", 2)}
          ></Radio>
          <Radio
            name="input3"
            label="2 - 40% with 2 years teaching experience/industry
practice"
            onChange={() => handleRadioChange("2", "input", 2)}
          ></Radio>
          <Radio
            name="input3"
            label="3 - 50% with 3 years teaching experience/industry
practice"
            onChange={() => handleRadioChange("3", "input", 2)}
          ></Radio>
          <Radio
            name="input3"
            label="4 - 60% with 4 years teaching experience/industry practice"
            onChange={() => handleRadioChange("4", "input", 2)}
          ></Radio>
          <Radio
            name="input3"
            label="5 - 70 % with a minimum of 5 years teaching
experience/industry practice"
            onChange={() => handleRadioChange("5", "input", 2)}
          ></Radio>
          <Typography>
            4.Faculty members are affiliated with professional organizations in
            their fields of specialization.
          </Typography>
          <Radio
            name="input4"
            label="1 - Lower than 60% of the faculty have no affiliation with
professional organizations"
            onChange={() => handleRadioChange("1", "input", 3)}
          ></Radio>
          <Radio
            name="input4"
            label="2 - 70% with of the faculty are affiliated with local
professional organizations"
            onChange={() => handleRadioChange("2", "input", 3)}
          ></Radio>
          <Radio
            name="input4"
            label="3 - 80% of the faculty are affiliated with regional
professional organizations"
            onChange={() => handleRadioChange("3", "input", 3)}
          ></Radio>
          <Radio
            name="input4"
            label="4 - 90% of the faculty are affiliated with international and/or
national professional organizations"
            onChange={() => handleRadioChange("4", "input", 3)}
          ></Radio>
          <Radio
            name="input4"
            label="5 - 100% of the faculty are affiliated with international
and/or national professional organizations"
            onChange={() => handleRadioChange("5", "input", 3)}
          ></Radio>
          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.Regular updating, monitoring and evaluation of faculty
            qualifications
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
            2.Provision for Faculty Development Program: Scholarships,
            Trainings, Workshops, and Grants
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
          <Typography className="text-left text-2xl font-bold">
            OUTPUT
          </Typography>
          <Typography>
            1.Faculty members demonstrate mastery of the subject matter and
            effective delivery of the learning competencies in their own field
            of expertise.
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
          <Typography>
            2.Faculty members are members or leaders of recognized professional
            organizations here and abroad.
          </Typography>
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
          <Typography>
            3.The institution is able to comply with CHED’s requirements, ASEAN
            requirements, and other international standards on faculty
            qualifications
          </Typography>
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
          <Typography className="text-left text-2xl font-bold">
            Comments
          </Typography>
          <Input label="Best Practices"></Input>
        </Card>
      </div>
    </>
  );
}
