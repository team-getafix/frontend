"use client";

import React, { useState, useEffect } from 'react';
import CourseJoin from "@/components/CourseJoin";
import CourseCreate from "@/components/CourseCreate";
import ClassCard from "@/components/ClassCard";
import { isTokenValid } from '@/utils/authUtils';

function App() {
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

  return (
    <div className="m-10 w-full">
      <NoClasses/>
    </div>
  );
}