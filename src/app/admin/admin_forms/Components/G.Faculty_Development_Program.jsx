import React, { useState } from "react";
import { Card, Typography, Radio, Input } from "@material-tailwind/react";

export default function Faculty_Development_Program({
  FacultyDevelopmentMean,
}) {
  const [inputValues, setInputValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [processValues, setProcessValues] = useState(["", "", ""]);
  const [outputValues, setOutputValues] = useState(["", "", "", "", ""]);

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

  FacultyDevelopmentMean(totalWeightedMean);
  return (
    <>
      <div className="mt-10"></div>
      <div>
        <Card className="w-full h-full px-10 py-10">
          <h1 className="text-center text-2xl font-bold">
            FACULTY DEVELOPMENT PROGRAM
          </h1>
          <Typography className="text-left text-2xl font-bold">
            INPUTS
          </Typography>
          <Typography>
            1.The institution has Faculty Development Program as shown by the
            following: a. budget; b. trainings and seminars; c. financial
            assistance; d. honorarium; e. scholarships; f. service credits; g.
            leave credits; and h. career advancement/ promotion.
          </Typography>
          <Radio
            name="input1"
            label="1 - One (1) of the items mentioned is present"
            onChange={() => handleRadioChange("1", "input", 0)}
          />
          <Radio
            name="input1"
            label="2 - Two (2) of the items mentioned are present"
            onChange={() => handleRadioChange("2", "input", 0)}
          />
          <Radio
            name="input1"
            label="3 - Four (4) of the items mentioned are present"
            onChange={() => handleRadioChange("3", "input", 0)}
          />
          <Radio
            name="input1"
            label="4 - Six (6) of the items mentioned are present"
            onChange={() => handleRadioChange("4", "input", 0)}
          />
          <Radio
            name="input1"
            label="5 - All items mentioned are present"
            onChange={() => handleRadioChange("5", "input", 0)}
          />
          <Typography>
            2. There is an orientation/ reorientation program for all faculty
            which includes the institution’s mission statements and its
            philosophy, institutional strategies and policies.
          </Typography>
          <Radio
            name="input2"
            label="1 - the institution does not conduct orientation/ reorientation
program "
            onChange={() => handleRadioChange("1", "input", 1)}
          />
          <Radio
            name="input2"
            label="2 - the institution conducts orientation/ reorientation
program as the need arises"
            onChange={() => handleRadioChange("2", "input", 1)}
          />
          <Radio
            name="input2"
            label="3 - the institution conducts orientation/ reorientation
program every other year"
            onChange={() => handleRadioChange("3", "input", 1)}
          />
          <Radio
            name="input2"
            label="4 - the institution conducts orientation/ reorientation
program once a year"
            onChange={() => handleRadioChange("4", "input", 1)}
          />
          <Radio
            name="input2"
            label="5 – the institution conducts orientation/ reorientation
program every semester"
            onChange={() => handleRadioChange("5", "input", 1)}
          />
          <Typography>
            3.The institution has a specialized in-service training for faculty
            members in the form of: a. seminars; b. workshops; and c.
            educational tour/ benchmarking and the like.
          </Typography>
          <Radio
            name="input3"
            label="1 – One or two (1or 2 ) of the items mentioned are present
and conducted once a year"
            onChange={() => handleRadioChange("1", "input", 2)}
          />
          <Radio
            name="input3"
            label="2 – All of the items mentioned are present and conducted
once a year"
            onChange={() => handleRadioChange("2", "input", 2)}
          />
          <Radio
            name="input3"
            label="3 – One (1) of the items mentioned is present and
conducted every semester"
            onChange={() => handleRadioChange("3", "input", 2)}
          />
          <Radio
            name="input3"
            label="4 – Two (2) of the items mentioned above are present and
conducted every semester"
            onChange={() => handleRadioChange("4", "input", 2)}
          />
          <Radio
            name="input3"
            label="5 – All of the items mentioned are present and conducted
every semester"
            onChange={() => handleRadioChange("5", "input", 2)}
          />
          <Typography>
            4.There are formal study opportunities for faculty member
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
          <Typography>
            5.There is membership in professional organizations
          </Typography>
          <Radio
            name="input5"
            label="1"
            onChange={() => handleRadioChange("1", "input", 4)}
          />
          <Radio
            name="input5"
            label="2"
            onChange={() => handleRadioChange("2", "input", 4)}
          />
          <Radio
            name="input5"
            label="3"
            onChange={() => handleRadioChange("3", "input", 4)}
          />
          <Radio
            name="input5"
            label="4"
            onChange={() => handleRadioChange("4", "input", 4)}
          />
          <Radio
            name="input5"
            label="5"
            onChange={() => handleRadioChange("5", "input", 4)}
          />
          <Typography>
            6.The institution has financial support for faculty development
            program outside the school.
          </Typography>
          <Radio
            name="input6"
            label="1 - The institution grants 20% financial support"
            onChange={() => handleRadioChange("1", "input", 5)}
          />
          <Radio
            name="input6"
            label="2 - The institution grants 40% financial support"
            onChange={() => handleRadioChange("2", "input", 5)}
          />
          <Radio
            name="input6"
            label="3 - The institution grants 60% financial support"
            onChange={() => handleRadioChange("3", "input", 5)}
          />
          <Radio
            name="input6"
            label="4 - The institution grants 80% financial support"
            onChange={() => handleRadioChange("4", "input", 5)}
          />
          <Radio
            name="input6"
            label="5 - The institution grants 100% financial support"
            onChange={() => handleRadioChange("5", "input", 5)}
          />
          <Typography>
            7.There are opportunities available to the full-time faculty in the
            graduate and post graduate programs as follows: 7.1 scholarships/
            grants and fellowship 7.2 research 7.3 seminars and training.
          </Typography>
          <Radio
            name="input7"
            label="1"
            onChange={() => handleRadioChange("1", "input", 6)}
          />
          <Radio
            name="input7"
            label="2"
            onChange={() => handleRadioChange("2", "input", 6)}
          />
          <Radio
            name="input7"
            label="3"
            onChange={() => handleRadioChange("3", "input", 6)}
          />
          <Radio
            name="input7"
            label="4"
            onChange={() => handleRadioChange("4", "input", 6)}
          />
          <Radio
            name="input7"
            label="5"
            onChange={() => handleRadioChange("5", "input", 6)}
          />
          <Typography>
            8.There are faculty and committee meetings such as: a. Institutional
            meeting b. College meeting c. Department meeting d. Committee /
            Project meeting
          </Typography>
          <Radio
            name="input8"
            label="1 – No meetings conducted"
            onChange={() => handleRadioChange("1", "input", 7)}
          />
          <Radio
            name="input8"
            label="2 – One (1) of the mentioned meetings is conducted"
            onChange={() => handleRadioChange("2", "input", 7)}
          />
          <Radio
            name="input8"
            label="3 – Two (2) of the mentioned meetings are conducted"
            onChange={() => handleRadioChange("3", "input", 7)}
          />
          <Radio
            name="input8"
            label="4 – Three (3) of the mentioned meetings are conducted"
            onChange={() => handleRadioChange("4", "input", 7)}
          />
          <Radio
            name="input8"
            label="5 – All of the mentioned meetings are conducted"
            onChange={() => handleRadioChange("5", "input", 7)}
          />
          <Typography className="text-left text-2xl font-bold">
            PROCESSES
          </Typography>
          <Typography>
            1.The institution proposes a budget for Faculty Development Program.
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
            2.The institution solicits the approval of the Faculty Development
            Program.
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
            3.The institution monitors the faculty meeting and attendance of
            faculty in meetings, seminars and other training program.
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
          <Typography className="text-left text-2xl font-bold">
            OUTPUT
          </Typography>
          <Typography>
            1.The budget for Faculty Development Programs was implemented.
          </Typography>
          <Radio
            name="output1"
            label="1 - The institution strictly implements 20% of the budgeted
faculty development program"
            onChange={() => handleRadioChange("1", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="2 - The institution strictly implements 40% of the budgeted
faculty development program"
            onChange={() => handleRadioChange("2", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="3 - The institution strictly implements 60% of the budgeted
faculty development program"
            onChange={() => handleRadioChange("3", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="4 -The institution strictly implements 80% of the budgeted
faculty development program"
            onChange={() => handleRadioChange("4", "output", 0)}
          ></Radio>
          <Radio
            name="output1"
            label="5 - The institution strictly implements 100% of the
budgeted faculty development program"
            onChange={() => handleRadioChange("5", "output", 0)}
          ></Radio>
          <Typography>2.Meetings regularly held.</Typography>
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
          <Typography>3.In service training regularly conducted.</Typography>
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
          <Typography>4.Faculty Scholarships.</Typography>
          <Radio
            name="output4"
            label="1 – 1% of the regular faculty members are granted study
opportunities as shown by scholarship in the graduate
and post-graduate programs through the different
sponsoring agencies such as CHED, DOST, CSC and
others."
            onChange={() => handleRadioChange("1", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="2 – 2% of the regular faculty members are granted study
opportunities as shown by scholarship in the graduate
and post-graduate programs through the different
sponsoring agencies such as CHED, DOST, CSC, and
others. "
            onChange={() => handleRadioChange("2", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="3 – 5% of the regular faculty members are granted study
opportunities as shown by scholarship in the graduate
and post-graduate programs through the different
sponsoring agencies such as CHED, DOST, CSC, and
others. "
            onChange={() => handleRadioChange("3", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="4 – 8% of the regular faculty members are granted study
opportunities as shown by scholarship in the graduate
and post-graduate programs through the different
sponsoring agencies such as CHED, DOST, CSC, and
others. "
            onChange={() => handleRadioChange("4", "output", 3)}
          ></Radio>
          <Radio
            name="output4"
            label="5 – 10% of the regular faculty members are granted study
opportunities as shown by scholarship in the graduate
and post-graduate programs through the different
sponsoring agencies such as CHED, DOST, CSC, and
others."
            onChange={() => handleRadioChange("5", "output", 3)}
          ></Radio>
          <Typography>
            5.Updated membership in professional organization.
          </Typography>
          <Radio
            name="output5"
            label="1 – 20% of the faculty are members of professional
organizations as shown by their valid ID, certificates,
and/or official receipts"
            onChange={() => handleRadioChange("1", "output", 4)}
          ></Radio>
          <Radio
            name="output5"
            label="2 – 40% of the faculty are members of professional
organizations as shown by their valid ID, certificates,
and/or official receipts "
            onChange={() => handleRadioChange("2", "output", 4)}
          ></Radio>
          <Radio
            name="output5"
            label="3 – 60% of the faculty are members of professional
organizations as shown by their valid ID, certificates,
and/or official receipts "
            onChange={() => handleRadioChange("3", "output", 4)}
          ></Radio>
          <Radio
            name="output5"
            label="4 – 80% of the faculty are members of professional
organizations as shown by their valid ID, certificates,
and/or official receipts "
            onChange={() => handleRadioChange("4", "output", 4)}
          ></Radio>
          <Radio
            name="output5"
            label="5 – 100% of the faculty are members of professional
organizations as shown by their valid ID, certificates,
and/or official receipts "
            onChange={() => handleRadioChange("5", "output", 4)}
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
