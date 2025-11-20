import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FacultyDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/faculty/students`);
      setStudents(res.data);
    } catch (err) {
      console.log("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-full border border-purple-300/30">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold text-sm">
              ✨ AI-Powered Analytics
            </span>
          </div>
          <h1 className="text-5xl font-black mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
              Faculty Dashboard
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Monitor and analyze student performance with AI predictions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white rounded-xl shadow-lg">
                <span className="text-3xl">👥</span>
              </div>
              <span className="text-3xl font-black text-purple-600">{students.length}</span>
            </div>
            <h3 className="text-gray-700 font-semibold">Total Students</h3>
          </div>

          <div className="group bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white rounded-xl shadow-lg">
                <span className="text-3xl">✅</span>
              </div>
              <span className="text-3xl font-black text-green-600">
                {students.filter(s => s.prediction === "Pass").length}
              </span>
            </div>
            <h3 className="text-gray-700 font-semibold">Predicted Pass</h3>
          </div>

          <div className="group bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white rounded-xl shadow-lg">
                <span className="text-3xl">⚠</span>
              </div>
              <span className="text-3xl font-black text-red-600">
                {students.filter(s => s.prediction === "Fail").length}
              </span>
            </div>
            <h3 className="text-gray-700 font-semibold">At Risk</h3>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border-2 border-gray-200 shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                  <span className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">📊</span>
                  Student Roster
                </h2>
                <p className="text-purple-100">Comprehensive AI-based performance predictions</p>
              </div>
              <div className="hidden md:block p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="text-2xl font-black">{students.length}</div>
                <div className="text-xs text-purple-100">Students</div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="p-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="p-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Predicted Grade
                  </th>
                  <th className="p-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Confidence
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span className="text-gray-600 font-semibold">Loading student data...</span>
                      </div>
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-6 bg-gray-100 rounded-full">
                          <span className="text-6xl">📚</span>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-gray-800 mb-2">No Students Found</p>
                          <p className="text-gray-500">Start adding students to see predictions</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  students.map((s, i) => (
                    <tr 
                      key={i} 
                      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:via-pink-50 hover:to-blue-50 transition-all duration-300 group"
                    >
                      {/* Student Name */}
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {s.name?.charAt(0) || "S"}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <span className="font-bold text-gray-800 text-lg">{s.name}</span>
                            <div className="text-xs text-gray-500">Student ID: {i + 1001}</div>
                          </div>
                        </div>
                      </td>

                      {/* Predicted Grade */}
                      <td className="p-5">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                          <span>🎯</span>
                          <span>{s.predicted_grade || "—"}</span>
                        </div>
                      </td>

                      {/* Prediction Pass/Fail */}
                      <td className="p-5">
                        <div
                          className={`inline-flex items-center gap-2 px-5 py-2.5 font-black text-base rounded-xl shadow-lg border-2 transition-all hover:scale-105 ${
                            s.prediction === "Pass"
                              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-300"
                              : "bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-300"
                          }`}
                        >
                          <span>{s.prediction === "Pass" ? "✓" : "✗"}</span>
                          <span>{s.prediction}</span>
                        </div>
                      </td>

                      {/* Confidence */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${parseFloat(s.confidence_level) || 0}% `}}
                            ></div>
                          </div>
                          <span className="font-black text-gray-800 text-lg min-w-[60px]">
                            {s.confidence_level}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}