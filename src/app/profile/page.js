"use client";

import { useState, useEffect } from "react";

async function getUser() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:4000/api/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`)
            
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        // TODO: alert
        return null;
    }
}

export default function ProfileView() {
    const [user, setUser] = useState({ 
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com" 
    });

    useEffect(() => {
        const fetchUser = async() => { 
            const userData = await getUser();

            console.log(userData);

            if (userData) {
                setUser({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email
                })
            }
        };

        fetchUser();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setTimeout(() => {
            window.location.href = "/login";
        });
    };

    return (
        <div className="flex min-h-screen w-full bg-gradient-to-r from-gray-100 to-gray-300">
            {/* Centered Content */}
            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
                    <div className="flex flex-col items-center">
                        <div className="text-5xl text-gray-700 mb-3">👤</div>
                        <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                    <button 
                        onClick={handleSignOut} 
                        className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

