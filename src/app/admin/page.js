export default function AdminPage() {
    return (
        <div className="flex justify-center items-center m-10 w-full h-full">
            <div className="grid grid-cols-2 gap-4 justify-center text-xl">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5">
                    New Class
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5">
                    View Classes
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5">
                    New Subject
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5">
                    View Subjects
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-5">
                    New User
                </button>
            </div>
        </div>
    )
}