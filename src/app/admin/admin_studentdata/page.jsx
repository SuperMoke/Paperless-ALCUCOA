"use client";
import React, { useState, useEffect } from "react";
import { Typography, Card, CardBody, Input } from "@material-tailwind/react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import Header from "../header";
import Sidebar from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

export default function AdminStudentData() {
  const [surveyData, setSurveyData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

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
      </div>
      <ToastContainer />
    </div>
  );
}
