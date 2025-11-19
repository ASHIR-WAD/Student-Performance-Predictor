import React from "react";



export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Welcome to Student Dashboard 🎓
        </h1>
        <p className="text-gray-600 text-lg">
          You have successfully signed up as a student.
        </p>
      </div>
    </div>
  );
}
