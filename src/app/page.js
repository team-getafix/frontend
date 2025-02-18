"use client";

function App() {
  return (
    <div className="m-10 w-full">
      <div className="flex flex-col items-end justify-end">
        <img src="https://www.gstatic.com/classroom/web/home/dark_create_class_arrow.svg" alt="Vercel Logo" className="h-12 w-12 -translate-x-3 -translate-y-3 scale-150" />
        <h1 className="text-center font-medium">Don’t see your classes?<br/>Try another account</h1>
      </div>
      <div className="flex flex-col text-center items-center justify-center h-full m-5 font-semibold">
        <h1>Add a course to get started</h1>
        <div className="justify-between sm:space-x-4 mt-2">
          <button className="text-blue-500 rounded p-2 hover:bg-slate-300 duration-300">Create a course</button>
          <button className="bg-blue-500 rounded p-2 text-white hover:bg-blue-700 hover:shadow-lg duration-300">Join a course</button>
        </div>
      </div>
    </div>
  );
}

export default App;