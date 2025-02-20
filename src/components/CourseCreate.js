import React, { useState } from "react";

export default function CourseCreate({ close }) {
  const [formData, setFormData] = useState({
    courseName: "",
    courseSection: "",
    courseRoom: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = formData.courseName.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Course Created:", formData);
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={close}>
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div 
        className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-700 mb-4 pb-4 border-b">Create a Course</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="Course name (required)"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <input
              type="text"
              id="courseSection"
              name="courseSection"
              placeholder="Section"
              value={formData.courseSection}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <input
              type="text"
              id="courseRoom"
              name="courseRoom"
              placeholder="Room"
              value={formData.courseRoom}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={close} className="text-sm text-orange-600 hover:underline">
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-4 text-sm font-medium rounded-md text-white duration-300 ${
                isFormValid ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
