"use client";

import { useState, useEffect } from "react";
import { FaRegClipboard } from "react-icons/fa";

async function getAssignment(submissionId) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:4000/api/submission/assignments/${submissionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${token}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;

  } catch (e) {
    alert(`Error while loading assignments: ${e}`);
    return null;
  }
}

export default function HomeworkItem({ homework }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [file, setFile] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [grade, setGrade] = useState(null);

  // useEffect(() => {
  //   const fetchAssignment = async() => {
  //     const assignmentData = await getAssignment(homework.id);
  //     console.log(assignmentData);
  //   }

  //   console.log(homework.id);
  //   fetchAssignment();
  // }, [homework.id]);

  async function handleFileUpload(event) {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", homework.id);

    // try {
    //   const token = localStorage.getItem("token");
    //   const response = await fetch("http://localhost:4003/submissions", {
    //     method: "POST",
    //     headers: { Authorization: `Bearer ${token}` },
    //     body: formData,
    //   });

    //   if (!response.ok) throw new Error("Failed to upload file");

    //   alert("File uploaded successfully!");
    //   setFile(null);
    //   setIsSubmitted(true);
    // } catch (error) {
    //   console.error(error);
    //   alert("Upload failed");
    // }
  }

  async function handleDownload() {
    if (!submission) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4003/submissions/${submission.id}/file`, {
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
      alert("Download failed");
    }
  }

  return (
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
              {isSubmitted ? "Submited ✅" : "Not submited ❌"}
            </p>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-2">{homework.description || "No description."}</p>

          {homework.files && homework.files.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold">Attached files:</h3>
              <ul className="list-disc ml-5">
                {homework.files.map((file, index) => (
                  <li key={index}>
                    <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Форма за качване на файл */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Предай домашно</h3>
            <form onSubmit={handleFileUpload} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2 mt-2">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded" />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Качване
              </button>
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

          {/* Поле за оценка */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Оценка:</h3>
            <p className={`text-lg font-bold ${grade !== null ? "text-blue-600" : "text-gray-500"}`}>
              {grade !== null ? `${grade}/100` : "Още няма оценка"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
