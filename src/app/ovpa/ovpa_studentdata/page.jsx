"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import Header from "../header";
import Sidebar from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

export default function OVPAStudentData() {
  const [surveyData, setSurveyData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false);
  const TIMEOUT_DURATION = 600000;

  useEffect(() => {
    const q = query(collection(db, "studentsurveys"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData.completedAt) {
            data.push({
              id: doc.id,
              ...docData,
              completedAt: docData.completedAt.toDate(),
            });
          }
        });
        setSurveyData(data);
      },
      (error) => {
        console.error("Error fetching survey data:", error);
        toast.error("Failed to fetch survey data.");
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (surveyData.length > 0) {
      const filteredData = filterDataByDate(new Date(selectedDate));
      processChartData(filteredData);
    }
  }, [selectedDate, surveyData]);

  const filterDataByDate = (date) => {
    return surveyData.filter((data) => {
      if (!data.completedAt) return false;
      return (
        data.completedAt.getDate() === date.getDate() &&
        data.completedAt.getMonth() === date.getMonth() &&
        data.completedAt.getFullYear() === date.getFullYear()
      );
    });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const processChartData = (data) => {
    const ratingQuestions = {};

    data.forEach((survey) => {
      if (survey.radioGroupQuestions) {
        survey.radioGroupQuestions.forEach((question) => {
          if (!ratingQuestions[question.name]) {
            ratingQuestions[question.name] = {
              title: question.title,
              responses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            };
          }
          const response = parseInt(question.userResponse);
          if (response >= 1 && response <= 5) {
            ratingQuestions[question.name].responses[response]++;
          }
        });
      }
    });

    const chartDataObj = {};
    Object.entries(ratingQuestions).forEach(([questionName, questionData]) => {
      chartDataObj[questionName] = {
        title: questionData.title,
        chartData: {
          labels: ["1", "2", "3", "4", "5"],
          datasets: [
            {
              label: "Number of Responses",
              data: Object.values(questionData.responses),
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
      };
    });

    setChartData(chartDataObj);
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    // Check for inactivity
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity >= TIMEOUT_DURATION) {
        setShowTimeoutDialog(true);
      }
    }, 60000); // Check every minute

    return () => {
      // Cleanup
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
      clearInterval(interval);
    };
  }, [lastActivity]);

  const handleTimeout = () => {
    auth.signOut();
    setShowTimeoutDialog(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 sm:ml-64">
          <div className="flex justify-end mb-4">
            <div className="relative w-48">
              <Input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className=""
              />
            </div>
          </div>
          <div className="w-full overflow-x-scroll shadow-md rounded-lg">
            <div className="min-w-[1000px]">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-gray-200 bg-gray-50 p-4 min-w-[400px]">
                      Question
                    </th>
                    <th className="border-b border-gray-200 bg-gray-50 p-4">
                      1
                    </th>
                    <th className="border-b border-gray-200 bg-gray-50 p-4">
                      2
                    </th>
                    <th className="border-b border-gray-200 bg-gray-50 p-4">
                      3
                    </th>
                    <th className="border-b border-gray-200 bg-gray-50 p-4">
                      4
                    </th>
                    <th className="border-b border-gray-200 bg-gray-50 p-4">
                      5
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(chartData).map(([questionName, data]) => (
                    <tr key={questionName}>
                      <td className="p-4 border-b border-gray-200">
                        {data.title}
                      </td>
                      {data.chartData.datasets[0].data.map((count, index) => (
                        <td
                          key={index}
                          className="p-4 border-b border-gray-200"
                        >
                          {count}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {Object.entries(chartData).length === 0 ? (
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center mt-8"
            >
              No data available for the selected date.
            </Typography>
          ) : (
            Object.entries(chartData).map(([questionName, data]) => (
              <Card key={questionName} className="w-full mb-8">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-4">
                    {data.title}
                  </Typography>
                  <div className="w-full">
                    <Bar data={data.chartData} options={chartOptions} />
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
        <Dialog
          open={showTimeoutDialog}
          handler={() => {}}
          className="min-w-[350px]"
        >
          <DialogHeader>Session Timeout</DialogHeader>
          <DialogBody>
            Your session has expired due to inactivity. You will be redirected
            to the login page.
          </DialogBody>
          <DialogFooter>
            <Button onClick={handleTimeout} color="green">
              Okay
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
}
