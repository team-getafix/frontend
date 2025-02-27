"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTeacher } from '@/utils/authUtils';

export default function ClassCard() {
    const [classes, setClasses] = useState([]);
    const router = useRouter();

    const handleClassClick = (class_id) => {
        router.push(`/class?classId=${class_id}`);
    }

    async function fetchSubjectsForTeacher() {
        const token = localStorage.getItem('token');

        if (!isTeacher()) {
            return
        }

        try {
            const response = await fetch('http://localhost:4000/api/class/subjects', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                const rawData = await response.json();
                const data = {};
                // rawData.map((subject) => (
                //     if (subject.)
                // ));

                setClasses(data);
            } else {
                console.error(`${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            // TODO: alert
        }
    }

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="flex flex-wrap max-sm:justify-center gap-4 m-10">
            {classes.map((class_) => (
                <div
                    key={class_.id}
                    className="relative w-80 h-48 rounded-2xl shadow-lg overflow-hidden text-white bg-blue-500 cursor-pointer hover:shadow-lg transition"
                    onClick={() => handleClassClick(class_.id)}
                >
                    <div className="p-4 h-2/3">
                        <h2 className="text-xl font-bold">{class_.name}</h2>
                        <p className="text-sm opacity-80">Room: {class_.room}</p>
                    </div>
                    <div className="absolute bottom-0 w-full bg-white text-gray-800 py-2 px-4 flex justify-between items-center">
                        <p className="text-sm font-semibold">Teacher: {class_.teacherName}</p>
                        <button className="text-blue-500 hover:underline text-sm">View</button>
                    </div>
                </div>
            ))}
        </div>
    )
}