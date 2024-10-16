import React, { useState } from "react";
import { Card, Input, Typography, Radio } from "@material-tailwind/react";

export default function Salaries_And_Fringe_Benefits({ SalariesBenefitsMean }) {
  const [inputValues, setInputValues] = useState(["", "", "", "", " "]);
  const [processValues, setProcessValues] = useState(["", "", "", ""]);
  const [outputValues, setOutputValues] = useState(["", "", ""]);

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

  SalariesBenefitsMean(totalWeightedMean);
  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            SALARIES AND FRINGE BENEFITS
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.Faculty members receive their salaries regularly.
          </Typography>
          <Radio
            name="input1"
            label="1 - All faculty members receive their salaries 4 or more
days after the payday"
            onChange={() => handleRadioChange("1", "input", 0)}
          />
          <Radio
            name="input1"
            label="2 - All faculty members receive their salaries 3 days after
the payday"
            onChange={() => handleRadioChange("2", "input", 0)}
          />
          <Radio
            name="input1"
            label="3 - All faculty members receive their salaries 2 days after
the payday"
            onChange={() => handleRadioChange("3", "input", 0)}
          />
          <Radio
            name="input1"
            label="4 - All faculty members receive their salaries 1 day after the
payday"
            onChange={() => handleRadioChange("4", "input", 0)}
          />
          <Radio
            name="input1"
            label="5 - All faculty members receive their salaries on time"
            onChange={() => handleRadioChange("5", "input", 0)}
          />
          <Typography>
            2.There is an existence of policy on salary and other fringe
            benefits duly approved by the BOR and is consistent with the
            Department of Budget and Civil Service Rules related to the
            following: a. Vacation pay; b. Salary adjustment/increment; c.
            Honorarium; d. Productivity incentive allowance; e. Overtime pay;
            and f. Clothing allowance/ other related allowances.
          </Typography>
          <Radio
            name="input2"
            label="1 – Existence of One (1) of the benefits mentioned"
            onChange={() => handleRadioChange("1", "input", 1)}
          />
          <Radio
            name="input2"
            label="2 – Existence of Two (2) of the benefits mentioned"
            onChange={() => handleRadioChange("2", "input", 1)}
          />
          <Radio
            name="input2"
            label="3 – Existence of three (3) of the benefits mentioned "
            onChange={() => handleRadioChange("3", "input", 1)}
          />
          <Radio
            name="input2"
            label="4 – Existence of four (4) of the benefits mentioned "
            onChange={() => handleRadioChange("4", "input", 1)}
          />
          <Radio
            name="input2"
            label="5 – Existence of all of the benefits mentioned above "
            onChange={() => handleRadioChange("5", "input", 1)}
          />
          <Typography>
            3.The institution has policies for leaves in accordance with the
            Civil Service Rules such as: a. Vacation Leave; b. Study Leave; c.
            Sabbatical; d. Service Leave; e. Sick Leave; and f. Other special
            leave privileges like funeral/ mourning leave, graduation leave,
            enrolment leave, wedding/ anniversary leave, birthday leave,
            hospitalization leave, relocation leave for a maximum of 3 days
            within a calendar year.
          </Typography>
          <Radio
            name="input3"
            label="1 - One/ Two (1 or 2) of the policies mentioned is/are
provided"
            onChange={() => handleRadioChange("1", "input", 2)}
          />
          <Radio
            name="input3"
            label="2 - Three (3) of the policies mentioned are provided"
            onChange={() => handleRadioChange("2", "input", 2)}
          />
          <Radio
            name="input3"
            label="3 - Four (4) of the policies mentioned are provided"
            onChange={() => handleRadioChange("3", "input", 2)}
          />
          <Radio
            name="input3"
            label="4 - Five (5) of the policies mentioned are provided"
            onChange={() => handleRadioChange("4", "input", 2)}
          />
          <Radio
            name="input3"
            label="5 - All of the policies mentioned are provided"
            onChange={() => handleRadioChange("5", "input", 2)}
          />
          <Typography>
            4.The institution has provisions for the following: a. Retirement
            program; b. Terminal leave; c. Monetization of leave credits; and d.
            Cash surrender value.
          </Typography>
          <Radio
            name="input4"
            label="1 - None of the items mentioned is provided"
            onChange={() => handleRadioChange("1", "input", 3)}
          />
          <Radio
            name="input4"
            label="2 - One (1) of the items mentioned is provided"
            onChange={() => handleRadioChange("2", "input", 3)}
          />
          <Radio
            name="input4"
            label="3 - Two (2) of the items mentioned are provided"
            onChange={() => handleRadioChange("3", "input", 3)}
          />
          <Radio
            name="input4"
            label="4 - Three (3) of the items mentioned are provided "
            onChange={() => handleRadioChange("4", "input", 3)}
          />
          <Radio
            name="type"
            label="5 - All the items mentioned are provided"
            onChange={() => handleRadioChange("5", "input", 3)}
          />
          <Typography>
            5.The faculty enjoy the other mandatory benefits such as: a. Medical
            benefits ; b. Loan and housing under PAG-IBIG; c. Loan and Housing
            under GSIS; and d. City and institutional benefit.
          </Typography>
          <Radio
            name="input5"
            label="1 - None of the items mentioned is provided"
            onChange={() => handleRadioChange("1", "input", 4)}
          />
          <Radio
            name="input5"
            label="2 - One (1) of the items mentioned is provided"
            onChange={() => handleRadioChange("2", "input", 4)}
          />
          <Radio
            name="input5"
            label="3 - Two (2) of the items mentioned are provided"
            onChange={() => handleRadioChange("3", "input", 4)}
          />
          <Radio
            name="input5"
            label="4 - Three (3) of the items mentioned are provided "
            onChange={() => handleRadioChange("4", "input", 4)}
          />
          <Radio
            name="input5"
            label="5 - All the items mentioned are provided"
            onChange={() => handleRadioChange("5", "input", 4)}
          />
          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.The institution set up a system for leave administration like
            ledger and leave form.
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
          <Typography>2.The institution audits leave credit.</Typography>
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
            3.The institution facilitates mandatory and fringe benefits within
            the prescribed period.
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
            4.The institution facilitates the payroll on time.
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
          <Typography className="text-left text-2xl font-bold">
            OUTPUT
          </Typography>
          <Typography>
            1.Facilitated payroll, mandatory benefit and different fringe
            benefit on time.
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
            2.System of leave administration is formulated and implemented.
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
          <Typography>3.Conducted regular audit of leave credits.</Typography>
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
