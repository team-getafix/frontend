'use client'

import { useState, useEffect } from "react";

async function getClasses() {
    const token = localStorage.getItem('token')

    try {
        const response = await fetch('http://localhost:4000/api/class/classes', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'accept': '*/*'
            }
        });

        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error)
        return null;
    }
}

async function deleteClass(classId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:4000/api/class/classes/${classId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`Can not delete class ${classId} (${response.status} ${response.statusText})`);
        }

        window.location.reload();
    } catch (error) {
        console.error(error);
        // TODO: alert
    }
}

export default function ClassesView() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async() => { 
            const classData = await getClasses();

            console.log(classData);

            setClasses(classData)
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    { classes.map((class_) => {
                        return <tr key={class_.id}><td>{class_.id}</td><td>{class_.name}</td><td><button onClick={ () => deleteClass(class_.id) }>Delete</button></td></tr>
                    })}
                </tbody>
            </table>
            <ul>
                
            </ul>
        </div>
    )
}