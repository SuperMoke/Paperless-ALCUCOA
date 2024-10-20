"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import Header from "../header";
import Sidebar from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminStudentForms() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState("All");

  const institutes = ["All", "ICSLIS", "IEAS", "IBM"];
  const programsByInstitute = {
    All: ["All"],
    ICSLIS: ["All", "BSCS", "BSIS", "BLIS"],
    IEAS: ["All", "BPEd", "BTVTEd", "BAELS", "BSNEd", "BSPYSCH", "BSMATH"],
    IBM: ["All", "BSTM", "BSE", "BSA"],
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsRef = collection(db, "userdata");
      const q = query(studentsRef, where("role", "==", "student"));
      const querySnapshot = await getDocs(q);
      const studentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsData);
      setFilteredStudents(studentsData);
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) => {
      const nameMatch = student.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const instituteMatch =
        selectedInstitute === "All" || student.institute === selectedInstitute;
      const programMatch =
        selectedProgram === "All" || student.program === selectedProgram;
      return nameMatch && instituteMatch && programMatch;
    });
    setFilteredStudents(filtered);
  }, [nameFilter, selectedInstitute, selectedProgram, students]);

  const handleSendSurvey = async (studentId) => {
    try {
      await addDoc(collection(db, "studentsurveys"), {
        studentId,
        sentAt: serverTimestamp(),
        status: "pending",
      });
      toast.success("Survey sent successfully!");
    } catch (error) {
      console.error("Error sending survey:", error);
      toast.error("Failed to send survey. Please try again.");
    }
  };

  const handleSendToAll = async () => {
    try {
      const batch = [];
      filteredStudents.forEach((student) => {
        batch.push(
          addDoc(collection(db, "studentsurveys"), {
            studentId: student.id,
            sentAt: serverTimestamp(),
            status: "pending",
          })
        );
      });
      await Promise.all(batch);
      toast.success("Surveys sent to all students successfully!");
    } catch (error) {
      console.error("Error sending surveys to all students:", error);
      toast.error("Failed to send surveys to all students. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 sm:ml-64">
          <Card className="w-full mb-8">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Student Data
              </Typography>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input
                  type="text"
                  label="Filter by Student Name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="w-full"
                />
                <Select
                  label="Select Institute"
                  value={selectedInstitute}
                  onChange={(value) => {
                    setSelectedInstitute(value);
                    setSelectedProgram("All");
                  }}
                >
                  {institutes.map((institute) => (
                    <Option key={institute} value={institute}>
                      {institute}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Select Program"
                  value={selectedProgram}
                  onChange={(value) => setSelectedProgram(value)}
                >
                  {programsByInstitute[selectedInstitute].map((program) => (
                    <Option key={program} value={program}>
                      {program}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex justify-end mb-4">
                <Button color="green" size="sm" onClick={handleSendToAll}>
                  Send to All
                </Button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.yearlevel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          color="green"
                          size="sm"
                          onClick={() => handleSendSurvey(student.id)}
                        >
                          Send Survey
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
