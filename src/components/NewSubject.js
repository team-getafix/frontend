"use client" // TODO: remove this

import MultipleSelect from "@/components/MultipleSelect"
import React, { useState, useEffect } from 'react';

// /api/auth/users?role=teacher

async function getTeachers() {
    const token = localStorage.getItem('token')

    try {
        const response = await fetch('http:localhost:4000/api/auth/users?role=teacher',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error(error) // TODO: alert
        return null;
    }
}

export default function NewSubject() {

    useEffect(() => {
        const teachers = getTeachers()

        console.log(teachers)
    }, []);

    return (
        <div className="flex items-center justify-center w-screen h-screen text-xl" suppressHydrationWarning>
            <form>
                <div className="mb-4">
                    <label className="font-semibold">
                        Subject name
                    </label>
                    <input id="name" name="name" className="shadow border rounded w-full pl-2" placeholder="Subject Name" ></input>
                </div>
                <div className="mb-4">
                    <label className="font-semibold">
                        Teachers
                    </label>
                    {/* <MultipleSelect options={ [{'value': 'value1', 'label': 'option1'}, {'value': 'value2', 'label': 'option2'}] }/> */}
                </div>

                <div className="mb-4">
                    <button className="shadow border rounded-full bg-blue-500 text-white px-4 py-1" type="submit">
                        Create
                    </button>
                </div>
            </form>

            
        </div>

        
    )
}