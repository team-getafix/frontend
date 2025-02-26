"use client";

import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Alert } from "@/components/Alert";


export default function SignIn({ setIsSignUp }) {
    const [customAlert, setAlert] = useState({ visible: false, type: "", message: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                if (decodedToken.role === "admin") {
                    console.log("Logged in as admin");
                    setTimeout(() => {
                        window.location.href = "/admin";
                    });
                } else if (decodedToken.role === "user") {
                    console.log("Logged in as user");
                    setTimeout(() => {
                        window.location.href = "/subjects";
                    });
                } else {
                    console.log("Logged in with  unknown role");
                    setTimeout(() => {
                        window.location.href = "/subjects";
                    });
                }
                setAlert({
                    visible: true,
                    type: "success",
                    message: `Signed in successfully.`,
                });
            } else {
                setAlert({
                    visible: true,
                    type: "error",
                    message: `${response.status} ${response.statusText}.`,
                });
            }
        } catch (error) {
            setAlert({
                visible: true,
                type: "error",
                message: `${error}.`,
            });
        }
    };

    return (
        <>
            {customAlert.visible && (
                <Alert type={customAlert.type} message={customAlert.message} onClose={() => setAlert({ visible: false, type: "", message: "" })}/>
            )}
            <div className="lg:bg-white duration-300 px-10 py-10 rounded-2xl lg:border-2 border-gray-200">
                <h1 className="text-5xl font-semibold">Welcome!</h1>
                <p className="font-medium text-lg text-gray-500 mt-4">Please enter your details.</p>
                <form onSubmit={handleLogin} className="mt-8">
                    <div>
                        <label className="text-lg font-medium">Email</label>
                        <input
                            className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="getafix@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-lg font-medium">Password</label>
                        <input
                            className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                        <button
                            type="submit"
                            className="active:scale-[.98] active:duration-75 ease-in-out transition-all bg-orange-500 text-white text-lg rounded-xl py-3 font-bold"
                        >
                            Sign in
                        </button>
                    </div>
                    {/* <div className="mt-8 flex justify-center items-center">
                        <p className="font-medium text-base">Don't have an account?</p>
                        <button className="text-orange-500 text-base font-medium ml-2" onClick={() => setIsSignUp(true)}>Sign up</button>
                    </div> */}
                </form>
            </div>
        </>
    );
}