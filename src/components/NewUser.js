"use client"

import { capitalize } from "@/utils/stringUtils";
import { useState } from "react";
import { Alert } from "@/components/Alert";

export default function NewUser() {
    const [customAlert, setAlert] = useState({ visible: false, type: "", message: "" });

    function createUser(formData) {
        const email = formData.get('email');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const role = formData.get('role');

        const response = fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: role

            }),
        }).then(response => {
            if (response.ok) {
                setAlert({
                    visible: true,
                    type: "success",
                    message: `${capitalize(role)} ${firstName} ${lastName} created successfully`,
                });
                // alert(`${capitalize(formData.get('role'))} ${formData.get('firstName')} ${formData.get('lastName')} created successfully`);
            } else if (response.status == 409) {
                setAlert({
                    visible: true,
                    type: "error",
                    message: `User with email "${email}" already exists`,
                });
                // alert(`User with email "${formData.get('email')}" already exists`);
            } else {
                // console.error(`${response}`);
                // alert(`${response.status}: ${response.statusText}`);
                setAlert({
                    visible: true,
                    type: "error",
                    message: `${response.status}: ${response.statusText}`,
                });
            }
        }).catch(error => {
            setAlert({
                visible: true,
                type: "error",
                message: `${error}`,
            });
        });
    }

    return (    
        <>
            {customAlert.visible && (
                <Alert type={customAlert.type} message={customAlert.message} onClose={() => setAlert({ visible: false, type: "", message: "" })}/>
            )}
            <div className="flex items-center justify-center w-screen h-screen" suppressHydrationWarning>
                <form action={createUser}>
                    <div className="mb-4">
                        <label>
                            Email
                        </label>
                        <input id="email" name="email" className="shadow border rounded w-full pl-2" placeholder="example@example.com" ></input>
                    </div>
                    {/* <div className="mb-4">
                        <label>
                            Password
                        </label>
                        <input id="password" name="password" className="shadow border rounded w-full" placeholder="********" type="password"></input>
                    </div> */}

                    <div className="mb-4">
                        <label>
                            First Name
                        </label>
                        <input id="firstName" name="firstName" className="shadow border rounded w-full pl-2" placeholder="John"></input>
                    </div>
                    <div className="mb-4">
                        <label>
                            Last Name
                        </label>
                        <input id="lastName" name="lastName" className="shadow border rounded w-full pl-2" placeholder="Doe"></input>
                    </div>
                    <div className="mb-4">
                        <label>
                            Role
                        </label>
                        <select id="role" name="role" className="shadow border rounded w-full pl-1">
                            <option value="student" defaultValue>Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <button className="shadow border rounded-full bg-blue-500 text-white px-4 py-1" type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}