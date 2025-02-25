"use client";

import { useState, useEffect } from "react";
import HomeworkItem from "@/components/HomeworkItem";

export default function Classwork() {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeworks() {
      try {
        const data = [
            {
              id: 1,
              title: "Обектно-ориентирано програмиране",
              dueDate: "No due date",
              submitted: false,
              description: "Разглеждане на принципите на ООП.",
              files: ["https://example.com/oop.pdf"],
            },
            {
              id: 2,
              title: "Алгоритми и структури от данни",
              dueDate: "Due Mar 10, 11:59 PM",
              submitted: false,
              description: "Решаване на задачи с дървета и графи.",
              files: [],
            },
            {
              id: 3,
              title: "Основи на базите данни",
              dueDate: "Due Mar 15, 5:00 PM",
              submitted: false,
              description: "Работа с релационни бази данни.",
              files: ["https://example.com/sql-cheatsheet.pdf", "https://example.com/normalization.png"],
            },
          ];
        
        setHomeworks(data);
      } catch (error) {
        console.error("Error loading assignments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeworks();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

return (
    <div className="flex items-center justify-center min-h-screen w-full p-6">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col ">
            <h1 className="text-2xl font-semibold mb-4 text-center">Classwork</h1>
            <button className="text-blue-500 mb-6 text-left">View your work</button>
            <div className="w-full space-y-6"> 
                {homeworks.length > 0 ? (
                    homeworks.map((homework) => (
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
