import React from "react";
import {
  GraduationCap,
  TrendingUp,
  Target,
  Clock,
  Award,
  Activity,
  PieChart,
  BarChart3,
  Users,
  LogOut,
  Bell,
  Settings,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ========== SIDEBAR ========== */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-800">PredictEdu</h1>
            <p className="text-xs text-gray-500">Student Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white shadow-md">
            <BarChart3 size={18} />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
            <Activity size={18} />
            Performance
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
            <PieChart size={18} />
            Subjects
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
            <Users size={18} />
            Mentors
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}
        <header className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-5 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
            <p className="text-gray-600">Welcome back, student!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600">
              <Settings size={22} />
            </button>

            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
              <UserCircle size={24} className="text-white" />
            </div>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+12%</span>
            </div>
            <h3 className="text-gray-600 text-sm">Overall Performance</h3>
            <p className="text-2xl font-bold text-gray-800">85.5%</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target size={24} className="text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+5%</span>
            </div>
            <h3 className="text-gray-600 text-sm">Attendance</h3>
            <p className="text-2xl font-bold text-gray-800">92%</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-orange-600" />
              </div>
              <span className="text-blue-600 text-sm font-semibold">Avg</span>
            </div>
            <h3 className="text-gray-600 text-sm">Study Hours</h3>
            <p className="text-2xl font-bold text-gray-800">4.5 hrs</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Award size={24} className="text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">Top 10%</span>
            </div>
            <h3 className="text-gray-600 text-sm">Class Rank</h3>
            <p className="text-2xl font-bold text-gray-800">8th</p>
          </div>
        </div>

        {/* PERFORMANCE TREND + SUBJECT ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Performance Trend */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Performance Trend</h3>
              <Activity size={20} className="text-gray-500" />
            </div>

            <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-xl flex items-end justify-around p-4">
              {["65", "72", "68", "78", "82", "85", "90"].map((h, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-10 bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg"
                    style={{ height: `${h}%` }}
                  ></div>
                  <span className="text-xs text-gray-600">W{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Analysis */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Subject Analysis</h3>
              <PieChart size={20} className="text-gray-500" />
            </div>

            <div className="space-y-4">
              {[
                { name: "Mathematics", value: 92, color: "bg-blue-600" },
                { name: "Physics", value: 85, color: "bg-purple-600" },
                { name: "Chemistry", value: 88, color: "bg-green-600" },
                { name: "Computer Science", value: 95, color: "bg-orange-600" },
                { name: "English", value: 78, color: "bg-pink-600" },
              ].map((sub, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                    <span className="text-sm font-bold text-gray-800">{sub.value}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className={`${sub.color} h-2 rounded-full`}
                      style={{ width: `${sub.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
