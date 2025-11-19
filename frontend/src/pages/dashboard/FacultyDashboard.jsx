import React from "react";
import {
  GraduationCap,
  Users,
  BarChart3,
  LineChart,
  Settings,
  Bell,
  LogOut,
  Menu,
  BookOpen,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">PredictEdu</h1>
        </div>

        {/* Menu */}
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<BarChart3 />} text="Dashboard" active />
          <SidebarItem icon={<Users />} text="Students List" />
          <SidebarItem icon={<BookOpen />} text="Subjects" />
          <SidebarItem icon={<FileText />} text="Reports" />
          <SidebarItem icon={<Settings />} text="Settings" />
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Faculty Dashboard</h2>
            <p className="text-gray-600">Welcome back, Professor!</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative bg-white p-3 rounded-xl border hover:shadow">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-white p-3 rounded-xl border hover:shadow">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Users className="text-blue-600" />}
            title="Total Students"
            value="128"
          />
          <StatCard
            icon={<BookOpen className="text-green-600" />}
            title="Subjects Handling"
            value="4"
          />
          <StatCard
            icon={<LineChart className="text-purple-600" />}
            title="Overall Class Performance"
            value="82%"
          />
        </div>

        {/* ANALYTICS PLACEHOLDER */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Class Performance Overview
          </h3>
          <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            Chart Placeholder (Integrate later)
          </div>
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ icon, text, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
        active
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white p-6 border rounded-2xl shadow-sm hover:shadow transition">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h4 className="text-gray-600 text-sm">{title}</h4>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
