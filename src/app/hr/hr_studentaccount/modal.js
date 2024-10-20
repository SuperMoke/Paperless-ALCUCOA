import React, { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase"; // Ensure you have your firebase configuration and initialization in this file
import { toast } from "react-toastify";

const Modal = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [institute, setInstitute] = useState(user.institute);
  const [idnumber, setIDnumber] = useState(user.idnumber);
  const [yearLevel, setYearLevel] = useState(user.yearlevel);
  const [program, setProgram] = useState(user.program);

  const instituteProgramMap = {
    ICSLIS: [
      "Bachelor of Science in Computer Science (BSCS)",
      "Bachelor of Science in Information Systems (BSIS)",
      "Bachelor of Library and Information Science (BLIS)",
      "Associate in Computer Technology (ACT)",
    ],
    IEAS: [
      "Bachelor of Physical Education (BPEd)",
      "Bachelor of Technical-Vocational Teacher Education Major in Food and Service Management (BTVTEd)",
      "Bachelor of Arts in English Language Studies (BAELS)",
      "Bachelor of Special Needs Education (BSNEd)",
      "Bachelor of Science in Psychology (BSPYSCH)",
      "Bachelor of Science in Mathematics (BSMATH)",
    ],
    IBM: [
      "Bachelor of Science in Tourism Management (BSTM)",
      "Bachelor of Science in Entrepreneurship (BSE)",
      "Bachelor of Science in Accountancy (BSA)",
    ],
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, "userdata", user.id);
      await updateDoc(userDoc, {
        name,
        email,
        institute,
        idnumber,
        program,
        yearLevel,
      });

      onClose();
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <Card className="w-full max-w-2xl p-8 rounded-md shadow-md bg-white">
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSave}>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              Name
            </Typography>
            <Input
              type="text"
              label="Enter the Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              ID Number
            </Typography>
            <Input
              type="text"
              label="Enter The ID Number"
              value={idnumber}
              onChange={(e) => setIDnumber(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              Email
            </Typography>
            <Input
              type="email"
              label="Enter the Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography color="gray" className="font-normal mb-1">
              Year Level
            </Typography>
            <Select
              label="Select Year Level"
              value={yearLevel}
              onChange={(e) => setYearLevel(e)}
              required
            >
              <Option value="4th Year">4th Year</Option>
              <Option value="3rd Year">3rd Year</Option>
              <Option value="2nd Year">2nd Year</Option>
              <Option value="1st Year">1st Year</Option>
            </Select>
          </div>

          <div className="col-span-2">
            <Typography color="gray" className="font-normal mb-1">
              Institute
            </Typography>
            <Select
              label="Select Institute"
              value={institute}
              onChange={(e) => setInstitute(e)}
              required
            >
              <Option value="ICSLIS">
                Institute of Computing Studies and Library Information Science
              </Option>
              <Option value="IEAS">
                Institute of Education, Arts and Sciences
              </Option>

              <Option value="IBM">Institute of Business and Management</Option>
            </Select>
            <Typography color="gray" className="font-normal mb-1">
              Program
            </Typography>
            <Select
              label="Select Program"
              value={program}
              onChange={(value) => setProgram(value)}
              required
              disabled={!institute}
            >
              {institute &&
                instituteProgramMap[institute].map((prog) => (
                  <Option key={prog} value={prog}>
                    {prog}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="col-span-2 flex justify-center mt-4">
            <Button type="submit" className="text-white mr-5" color="green">
              Update
            </Button>
            <Button onClick={onClose} className="text-white" color="red">
              Close
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Modal;
