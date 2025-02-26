"use client";

import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import Stream from "@/components/Stream";
import PeopleTab from "@/components/PeopleTab";
import Classwork from "@/components/Classwork";

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState("stream");
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId');

  console.log(classId);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Navigation */}
      <nav className="bg-gray-100 p-2 m-2 flex space-x-4 border-b">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "stream" ? "text-orange-500" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("stream")}
        >
          Stream (Coming soon)
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "people" ? "text-orange-500" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("people")}
        >
          People
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "classwork" ? "text-orange-500" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("classwork")}
        >
          Classwork
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex p-6 justify-center overflow-auto">
        {activeTab === "stream" && (
          <Stream classId={classId}/>
        )}
        {activeTab === "people" && <PeopleTab />}
        {activeTab === "classwork" && <Classwork subjectId={ classId }/>}
      </main>
    </div>
  );
}