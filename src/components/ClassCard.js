"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClassCard() {
    const [classes, setClasses] = useState([]);
    const router = useRouter();

    const handleClassClick = (class_id) => {
        // window.location.href = '/class';
        router.push(`/class?classId=${class_id}`);
    }

    async function fetchClasses() {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:4000/api/class/student/my-classes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                const data = await response.json();
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
        <div>
            { classes.map((class_) => (
                <button key={ class_.id } data-id={ class_.id } onClick={ () => handleClassClick(class_.id) }>{ class_.name }</button>
            ))}
        </div>
    )
}