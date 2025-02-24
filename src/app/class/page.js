"use client";

import { useState } from "react";
import Stream from "@/components/Stream";
import PeopleTab from "@/components/PeopleTab";

export default function ClassPage({ classId, userId, isTeacher }) {
  const [activeTab, setActiveTab] = useState("stream");

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <nav className="bg-gray-100 p-4 flex space-x-4 border-b w-full">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition ${{
            stream: "bg-blue-500 text-white",
            people: "hover:bg-gray-200",
          }[activeTab]}`}
          onClick={() => setActiveTab("stream")}
        >
          Stream
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition ${{
            people: "bg-blue-500 text-white",
            stream: "hover:bg-gray-200",
          }[activeTab]}`}
          onClick={() => setActiveTab("people")}
        >
          People
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "stream" ? (
          <Stream classId={classId} userId={userId} isTeacher={isTeacher} />
        ) : (
          <PeopleTab />
        )}
      </main>
    </div>
  );
}