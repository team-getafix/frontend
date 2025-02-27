"use client";

export default function AdminPage() {

    return (
        <div className="flex justify-center items-center m-10 w-full h-full">
            <div className="grid grid-cols-2 gap-4 justify-center text-xl">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5" onClick={() => {
                    setTimeout(() => {
                        window.location.href = "/admin/classes/new-class";
                    });
                }}>
                    New Class
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5" onClick={() => {
                    setTimeout(() => {
                        window.location.href = "/admin/classes";
                    });
                }}>
                    View Classes
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5" onClick={() => {
                    setTimeout(() => {
                        window.location.href = "/admin/subjects/new-subject";
                    });
                }}>
                    New Subject
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5" onClick={() => {
                    setTimeout(() => {
                        window.location.href = "/admin/subjects";
                    });
                }}>
                    View Subjects
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5" onClick={() => {
                    setTimeout(() => {
                        window.location.href = "/admin/users/new-user";
                    });
                }}>
                    New User
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5" onClick={() => {
                    setTimeout(() => {
                        window.location.href = "/admin/users/delete-user";
                    });
                }}>
                    Delete User
                </button>
            </div>
        </div>
    )
}