import React, { useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";

export default function CourseJoin({ close }) {
  const [courseCode, setCourseCode] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={close}>
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        
        {/* Profile Section */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
        <RiAccountCircleFill className="w-12 h-12 rounded-full" />
          {/* <img
            src="/profile.jpg" // Replace with actual profile image URL
            alt="Profile"
            className="w-12 h-12 rounded-full"
          /> */}
          <div className="flex-1">
            <p className="text-sm text-gray-600">You are signed in as:</p>
            <p className="font-medium">User</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
          <button className="text-orange-700 text-base hover:underline">
            Switch Account
          </button>
        </div>

        {/* Course Code Input */}
        <label htmlFor="courseCode" className="block text-lg font-medium text-gray-700">
          Join with code
        </label>
        <input
          type="text"
          id="courseCode"
          name="courseCode"
          placeholder="Enter code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between mt-4">
          <button type="button" onClick={close} className="text-sm text-orange-600 hover:underline">
            Cancel
          </button>
          <button
            type="submit"
            className={`py-2 px-4 text-sm font-medium rounded-md text-white duration-300 ${
              courseCode
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!courseCode}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
