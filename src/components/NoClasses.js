import React, { useState, useEffect } from 'react';
import CourseJoin from "@/components/CourseJoin";
import CourseCreate from "@/components/CourseCreate";
import ClassCard from "@/components/ClassCard";
import { isTokenValid } from '@/utils/authUtils';
import { jwtDecode } from 'jwt-decode';

function NoClasses() {
  const [isClient, setIsClient] = useState(false);
  const [showCourseJoin, setShowCourseJoin] = useState(false);
  const [showCourseCreate, setShowCourseCreate] = useState(false);
  const [userRole, setUserRole] = useState('');

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

  const handleSignInClick = () => {
    // Redirect to sign-in page or handle sign-in logic
  };

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, []);

  if (!isClient) {
    return;
  }

  if (isTokenValid()) {
    return (
      <ClassCard/>
    )
  }

  return (
    <div id='no-classes'>
        <div className="flex flex-col items-end justify-end">
        <img src="https://www.gstatic.com/classroom/web/home/dark_create_class_arrow.svg" alt="Vercel Logo" className="h-12 w-12 -translate-x-3 -translate-y-3 scale-150" />
        <h1 className="text-center font-medium">Don’t see your classes?<br/>Try another account</h1>
        </div>
        <div className="flex flex-col text-center items-center justify-center h-full m-5 font-semibold">
        <h1>Add a course to get started</h1>
        <div className="justify-between sm:space-x-4 mt-2">
            {!userRole && (
              <button id='sign-in' className="bg-blue-500 rounded p-2 text-white hover:bg-blue-600 hover:shadow-lg duration-300" onClick={handleSignInClick}>Sign In</button>
            )}
            {(userRole === 'teacher' || userRole === 'admin') && (
              <button id='create' className="text-orange-500 rounded p-2 hover:bg-slate-200 duration-300" onClick={handleCreateCourseClick}>Create a course</button>
            )}
            {(userRole === 'student' || userRole === 'admin') && (
              <button id='join' className="bg-orange-500 rounded p-2 text-white hover:bg-orange-600 hover:shadow-lg duration-300" onClick={handleJoinCourseClick}>Join a course</button>
            )}
        </div>
        </div>
        {showCourseJoin && <CourseJoin close={handleCloseCourseJoin} />}
        {showCourseCreate && <CourseCreate close={handleCloseCourseCreate} />}
    </div>
  );
}

export default NoClasses;