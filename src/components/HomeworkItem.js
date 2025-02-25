"use client";

import { useState, useEffect } from "react";
import { FaRegClipboard } from "react-icons/fa";
import { Alert } from "@/components/Alert";

export default function HomeworkItem({ homework }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [file, setFile] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [grade, setGrade] = useState(null);
  const [customAlert, setAlert] = useState({ visible: false, type: "", message: "" });
  const [userRole, setUserRole] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4003/api/submissions/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch submissions");

        const data = await response.json();
        const userSubmission = data.find((sub) => sub.assignmentId === homework.id);
        setSubmission(userSubmission || null);
        setIsSubmitted(!!(userSubmission && userSubmission.filename));

        if (userSubmission && userSubmission.grade !== undefined) {
          setGrade(userSubmission.grade);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchSubmission();
  }, [homework.id]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  async function handleFileUpload(event) {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", homework.id);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4003/api/submissions", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");

      setAlert({ visible: true, type: "success", message: "File uploaded successfully!" });
      setFile(null);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setAlert({ visible: true, type: "error", message: "Upload failed" });
    }
  }

  async function handleDownload() {
    if (!submission) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4003/api/submissions/${submission.id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = submission.filename || "submission-file";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      setAlert({ visible: true, type: "error", message: "Download failed" });
    }
  }

  async function handleGradeSubmission() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4003/api/submissions/${submission.id}/grade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ grade, comment }),
      });

      if (!response.ok) throw new Error("Failed to submit grade");

      setAlert({ visible: true, type: "success", message: "Grade submitted successfully!" });
    } catch (error) {
      console.error(error);
      setAlert({ visible: true, type: "error", message: "Grade submission failed" });
    }
  }

  return (
    <>
      {customAlert.visible && (
        <Alert type={customAlert.type} message={customAlert.message} onClose={() => setAlert({ visible: false, type: "", message: "" })} />
      )}
      <div
        className="flex flex-col p-4 rounded-lg shadow-md bg-white transition hover:bg-gray-100 border border-gray-300 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaRegClipboard className="text-2xl text-gray-600" />
            <div>
              <h2 className="text-lg font-medium">{homework.title}</h2>
              <p className="text-sm text-gray-500">{homework.dueDate}</p>
              <p className={`text-sm font-semibold ${isSubmitted ? "text-green-600" : "text-red-600"}`}>
                {isSubmitted ? "Предадено ✅" : "Не е предадено ❌"}
              </p>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-2">{homework.description || "Няма описание."}</p>

            <div className="mt-4">
              <h3 className="text-sm font-semibold">Предай домашно</h3>
              <form onSubmit={handleFileUpload} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2 mt-2">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Качване</button>
              </form>
            </div>

            {submission && submission.filename && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Изтегли предаденото домашно</h3>
                <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Изтегли файла ({submission.filename})
                </button>
              </div>
            )}

            
            {submission && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Оценка и коментар:</h3>
                {userRole === "teacher" ? (
                  <>
                    <input
                      type="number"
                      value={grade || ""}
                      onChange={(e) => setGrade(Number(e.target.value))}
                      min="0"
                      max="100"
                      className="border p-2 rounded w-full mt-2"
                      placeholder="Въведете оценка (0-100)"
                    />
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="border p-2 rounded w-full mt-2"
                      placeholder="Напишете коментар"
                    ></textarea>
                    <button
                      onClick={handleGradeSubmission}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                    >
                      Запази оценката
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-semibold">Оценка:</h3>
                    <p className="text-lg font-bold text-blue-600">{grade !== null ? `${grade}/100` : "Още няма оценка"}</p>
                    <p className="text-gray-700">{comment || "Няма коментар."}</p>
                  </>
                )}
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-sm font-semibold">Оценка:</h3>
              <p className={`text-lg font-bold ${grade !== null ? "text-blue-600" : "text-gray-500"}`}>
                {grade !== null ? `${grade}/100` : "Още няма оценка"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
