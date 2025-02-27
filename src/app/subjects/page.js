"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTeacher, getId, isStudent } from '@/utils/authUtils';

async function getSubjectsTeacher() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:4000/api/class/subjects', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.error(`${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        return null;
        // TODO: alert
    }
}

async function getSubjectsStudent() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:4000/api/class/student/${getId()}/subjects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.error(`${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        return null;
        // TODO: alert
    }
}

export default function SubjectView() {
    const [subjects, setSubjects] = useState([]);
    const router = useRouter();

    const handleSubjectClick = (subject_id) => {
        router.push(`/subject?subjectId=${subject_id}`);
    }

    getId();

    useEffect(() => {
        const fetchSubjectsTeacher = async() => { 
            const subjectData = await getSubjectsTeacher();
            console.log(subjectData);
            setSubjects(subjectData);
        }
        const fetchSubjectsStudent = async() => { 
            const subjectData = await getSubjectsStudent();
            console.log(subjectData);
            setSubjects(subjectData);
        }

        if (isTeacher()) {
            fetchSubjectsTeacher();
        } else if (isStudent()) {
            fetchSubjectsStudent();
        }
    }, []);

    return (
        <div className="flex flex-wrap max-sm:justify-center gap-4 m-10">
            {subjects.map((subject_) => (
                <div
                    key={subject_.id}
                    className="relative w-80 h-48 rounded-2xl shadow-lg overflow-hidden text-white bg-blue-500 cursor-pointer hover:shadow-lg transition"
                    onClick={() => handleSubjectClick(subject_.id)}>
                    <div className="p-4 h-2/3">
                        <h2 className="text-xl font-bold">{subject_.name}</h2>
                        <p className="text-sm opacity-80">Room: {subject_.room}</p>
                    </div>
                    <div className="absolute bottom-0 w-full bg-white text-gray-800 py-2 px-4 flex justify-between items-center">
                        <p className="text-sm font-semibold">Teacher: {subject_.teacherName}</p>
                        <button className="text-blue-500 hover:underline text-sm">View</button>
                    </div>
                </div>
            ))}
        </div>
    )
}