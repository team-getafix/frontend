"use client"

import { useState, useEffect } from 'react';
import MultipleSelect from "@/components/MultipleSelect"

export default function NewClass() {
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    // const [selectedOptions, setSelectedOptions] = useState({
    //     selectedSubjects: [],
    //     selectedStudents: [],
    // });

    useEffect(() => {
        getSubjects().then(data => {
            setSubjects(data);
        });
        getStudents().then(data => {
            setStudents(data);
        });
    }, []);

    const handleSelectChange = (name, newSelectedOptions) => {
        if (name === 'subjects') {
            setSelectedSubjects(newSelectedOptions);
        } else if (name === 'students') {
            setSelectedStudents(newSelectedOptions);
        }
    };
    

    function createClass(formData) {
        const name = formData.get('name');
        console.log("Class Name:", name);
        console.log("Selected Subjects:", selectedSubjects);
        console.log("Selected Students:", selectedStudents);

        fetch('http://localhost:4000/api/class/classes', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                subjectIds: selectedSubjects,
                studentIds: selectedStudents
            })
        }).then(response => {
            console.log(response.status)
            return response.json()
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <form action={ createClass }>
                <div className="mb-4">
                    <label className="font-semibold">Class name</label>
                    <input id="name" name="name" className="shadow border rounded w-full pl-2" placeholder="Class name" ></input>
                </div>
                <div className="mb-4">
                    <label className="font-semibold">Subjects</label>
                    <MultipleSelect name='subjects' options={ subjects } selectedOptions={selectedSubjects}
    onChange={(newSelectedOptions) => handleSelectChange('subjects', newSelectedOptions)}/>
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Students</label>
                    <MultipleSelect name='students' options={ students } selectedOptions={selectedStudents}
    onChange={(newSelectedOptions) => handleSelectChange('students', newSelectedOptions)}/>
                </div>

                <div className="mb-4">
                    <button className="font-semibold bg-blue-600 rounded-full text-white p-2 hover:bg-blue-700">Create</button>
                </div>
            </form>
        </div>
    )
}

async function getSubjects() {
    console.log(localStorage.getItem('token'));

    try {
        const response = await fetch(`http://localhost:4000/api/class/subjects`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map(subject => ({
            value: subject.id,
            label: subject.name
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getStudents() {
    try {
        const response = await fetch(`http://localhost:4000/api/class/student/unassigned`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map(student => ({
            value: student.id,
            label: `${student.firstName} ${student.lastName} (${student.email})`
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}