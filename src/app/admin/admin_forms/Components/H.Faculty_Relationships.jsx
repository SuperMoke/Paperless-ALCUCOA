import React, { useState } from "react";
import { Card, Input, Typography, Radio } from "@material-tailwind/react";

export default function Faculty_Relationships({ FacultyRelationshipsMean }) {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [processValues, setProcessValues] = useState(["", ""]);
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

  FacultyRelationshipsMean(totalWeightedMean);

  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            FACULTY RELATIONSHIPS
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.There is a faculty association that provides for the personal and
            professional growth of its members, and promotes faculty welfare
            through the following activities/programs: a. sports and wellness
            activities b. scholarship c. sponsorship d. financial rewards for
            exemplary/commendable performances e. financial aid in case of
            wedding, retirement, sickness, disability, death f. team building
            activity g. spiritual activity h. special day celebration ( Family
            day, Teachers day)
          </Typography>
          <Radio
            name="input1"
            label="1 – One (1) of the items mentioned is provided"
            onChange={() => handleRadioChange("1", "input", 0)}
          />
          <Radio
            name="input1"
            label="2 - Two (2) of the items mentioned is provided"
            onChange={() => handleRadioChange("2", "input", 0)}
          />
          <Radio
            name="input1"
            label="3 - Four (4) of the items mentioned is provided"
            onChange={() => handleRadioChange("3", "input", 0)}
          />
          <Radio
            name="input1"
            label="4 - Six (6) of the items mentioned is provided"
            onChange={() => handleRadioChange("4", "input", 0)}
          />
          <Radio
            name="input1"
            label="5 - All items mentioned are provided"
            onChange={() => handleRadioChange("5", "input", 0)}
          />
          <Typography>
            2. There is good faculty relationship with the administration as
            evidenced in the following practices: a. involvement of the faculty
            in the formulation/revision of the institution’s purposes and
            objectives b. involvement in the academic and administrative
            policymaking c. practice of principle of academic freedom d.
            dialogue and open communication between the faculty and
            administration e. involvement of the faculty in the grievance
            committee.
          </Typography>
          <Radio
            name="input2"
            label="1 - One (1) of the mentioned items is practiced "
            onChange={() => handleRadioChange("1", "input", 1)}
          />
          <Radio
            name="input2"
            label="2 - Two (2) of the mentioned items are practiced "
            onChange={() => handleRadioChange("2", "input", 1)}
          />
          <Radio
            name="input2"
            label="3 - Three (3) of the mentioned items are practiced"
            onChange={() => handleRadioChange("3", "input", 1)}
          />
          <Radio
            name="input2"
            label="4 - Four (4) of the mentioned items are practiced"
            onChange={() => handleRadioChange("4", "input", 1)}
          />
          <Radio
            name="input2"
            label="5 - All of the mentioned items are practiced"
            onChange={() => handleRadioChange("5", "input", 1)}
          />
          <Typography>
            3.There is faculty- students relationship as evidenced in the
            following a. Faculty members are responsive to students’ needs. b.
            Faculty members are available for academic advising and
            consultations. c. Faculty members participate in
            co-curricular/extracurricular activities. d. Faculty members respond
            positively to grievances expressed by students. e. Faculty members
            are accessible to students.
          </Typography>
          <Radio
            name="input3"
            label="1 - One (1) of the mentioned items is evident"
            onChange={() => handleRadioChange("1", "input", 2)}
          />
          <Radio
            name="input3"
            label="2 - Two (2) of the mentioned items are evident"
            onChange={() => handleRadioChange("2", "input", 2)}
          />
          <Radio
            name="input3"
            label="3 - Three (3) of the mentioned items are evident"
            onChange={() => handleRadioChange("3", "input", 2)}
          />
          <Radio
            name="input3"
            label="4 - Four (4) of the mentioned items are evident"
            onChange={() => handleRadioChange("4", "input", 2)}
          />
          <Radio
            name="input3"
            label="5 - All of the mentioned items are evident"
            onChange={() => handleRadioChange("5", "input", 2)}
          />
          <Typography>
            4.There is relationship with other sectors as evidenced in the
            following: a. Faculty members have healthy relationships with the
            non-academic personnel. b. Faculty members actively participate in
            school projects and services.
          </Typography>
          <Radio
            name="input4"
            label="1"
            onChange={() => handleRadioChange("1", "input", 3)}
          />
          <Radio
            name="input4"
            label="2"
            onChange={() => handleRadioChange("2", "input", 3)}
          />
          <Radio
            name="input4"
            label="3"
            onChange={() => handleRadioChange("3", "input", 3)}
          />
          <Radio
            name="input4"
            label="4"
            onChange={() => handleRadioChange("4", "input", 3)}
          />
          <Radio
            name="input4"
            label="5"
            onChange={() => handleRadioChange("5", "input", 3)}
          />

          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.The institution supports Faculty Association programs and
            activities.
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
            2.The institution provides opportunities for faculty to have
            harmonious relationship with the administration, students and other
            stakeholders.
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
            1.Faculty Association activities and programs are conducted.
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
            2.Faculty activities and program with the administration/ students/
            other stakeholders are conducted.
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
          <Typography className="text-left text-2xl font-bold">
            Comments
          </Typography>
          <Input label="Best Practices"></Input>
        </Card>
      </div>
    </>
  );
}
