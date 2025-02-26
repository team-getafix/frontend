"use client";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeworkItem from "@/components/HomeworkItem";

export default function Classwork() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      const subjectId = 1;
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:4000/api/submission/subject/${subjectId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${token}`,
            'accept': 'application/json'
          }
        });
        
        if (response.status == 200) {
          setAssignments(response.json());
        } else {
          // TODO: alert
          console.error(response.status);
          console.error(response.statusText);
        }
      } catch (e) {
        console.error(e);
        // TODO: alert
      }

      setLoading(false);
    }

    fetchAssignments();
  }, []);



  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

return (
    <div className="flex items-center justify-center min-h-screen w-full p-6">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col ">
            <h1 className="text-2xl font-semibold mb-4 text-center">Classwork</h1>
            <button className="text-blue-500 mb-6 text-left">View your work</button>
            <div className="w-full space-y-6"> 
                {assignments.length > 0 ? (
                    assignments.map((homework) => (
                        <HomeworkItem key={homework.id} homework={homework} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Няма домашни.</p>
                )}
            </div>
        </div>
    </div>
);
}
