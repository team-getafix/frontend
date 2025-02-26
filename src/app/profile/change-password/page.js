"use client"

import { Alert } from "@/components/Alert";
import { useState } from "react";
import { capitalize } from "@/utils/stringUtils";

export default function ChangePasswordView() {
    const [customAlert, setAlert] = useState({ visible: false, type: "", message: "" });

    async function changePassword(formData) {
        const oldPassword = formData.get('oldPassword');
        const newPassword = formData.get('newPassword');
        const confirmNewPassword = formData.get('confirmNewPassword');
    
        console.log(oldPassword);
        console.log(newPassword);
        console.log(confirmNewPassword);
    
        try {
            const response = await fetch('http://localhost:4000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json', // Add this header
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword,
                }),
            });
    
            const responseData = await response.json(); // Await the JSON parsing
    
            if (response.ok) {
                setAlert({
                    visible: true,
                    type: "success",
                    message: `Password changed successfully`,
                });
            } else {
                // Access the message property from the parsed response data
                setAlert({
                    visible: true,
                    type: "error",
                    message: `${response.status}: ${capitalize(responseData.message) || 'Unknown error'}`,
                });
            }
        } catch (error) {
            setAlert({
                visible: true,
                type: "error",
                message: `Error: ${error.message || 'An unexpected error occurred'}`,
            });
        }
    }

    return (
        <>
            {customAlert.visible && (
                <Alert type={customAlert.type} message={customAlert.message} onClose={() => setAlert({ visible: false, type: "", message: "" })}/>
            )}
        
            <div className="flex justify-center items-center w-screen mt-20">
                <form className="text-xl" action={ changePassword }>
                    <div className="mb-4">
                        <label className="font-bold">Old password</label>
                    </div>
                    <div className="mb-4">
                        <input name="oldPassword" className="shadow rounded p-4 w-full" type="password" placeholder="Old password"></input>
                    </div>
                    <div className="mb-4">
                        <label className="font-bold">New password</label>
                    </div>
                    <div className="mb-4">
                        <input name="newPassword" className="shadow rounded p-4" type="password" placeholder="New password"></input>
                    </div>
                    <div className="mb-4">
                        <label className="font-bold">Confirm New password</label>
                    </div>
                    <div className="mb-4">
                        <input name="confirmNewPassword" className="shadow rounded p-4" type="password" placeholder="Confirm new password"></input>
                    </div>
                    <button className="shadow rounded p-4 bg-blue-500 hover:bg-blue-700 text-white font-bold" type="submit">Change Password</button>
                </form>
            </div>
        </>
    )
}