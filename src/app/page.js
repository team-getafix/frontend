"use client";

import React, { useState, useEffect } from 'react';
import CourseJoin from "@/components/CourseJoin";
import CourseCreate from "@/components/CourseCreate";
import ClassCard from "@/components/ClassCard";
import { isTokenValid, isAdmin, isStudent, isTeacher } from '@/utils/authUtils';

export default function App() {
  const [isClient, setIsClient] = useState(false);
  const [showCourseJoin, setShowCourseJoin] = useState(false);
  const [showCourseCreate, setShowCourseCreate] = useState(false);

  const handleJoinCourseClick = () => {
    setShowCourseJoin(true);
  };

  const handleCloseCourseJoin = () => {
    setShowCourseJoin(false);
  };

  const handleCreateCourseClick = () => {
    setShowCourseCreate(true);
  };

  const handleCloseCourseCreate = () => {
    setShowCourseCreate(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  if (isTokenValid() && !isAdmin()) {
    return (
      <ClassCard/>
    )
  }

  if (!isTokenValid()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <div className="m-10 w-full">
      <div id='no-classes'>
        <div className="flex flex-col items-end justify-end">
          <img src="https://www.gstatic.com/classroom/web/home/dark_create_class_arrow.svg" alt="Vercel Logo" className="h-12 w-12 -translate-x-3 -translate-y-3 scale-150" />
          <h1 className="text-center font-medium">Don’t see your classes?<br/>Try another account</h1>
        </div>
        <div className="flex flex-col text-center items-center justify-center h-full m-5 font-semibold">
          <h1>Add a course to get started</h1>
          <div className="justify-between sm:space-x-4 mt-2">
            {isStudent() && isTokenValid() && (
              <h2>You are a student</h2>
            )}
            {isTeacher() && isTokenValid() && (
              <h2>You are a teacher</h2>
            )}
          </div>
        </div>
        {showCourseJoin && <CourseJoin close={handleCloseCourseJoin} />}
        {showCourseCreate && <CourseCreate close={handleCloseCourseCreate} />}
      </div>
    </div>
  );
}