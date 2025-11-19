import React, { useState } from "react";
import {
  Home,
  TrendingUp,
  BarChart3,
  Users,
  MessageSquare,
  LogOut,
  Bell,
  Settings,
  UserCircle,
  Award,
  Clock,
  Target,
  Activity,
  PieChart,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">PredictEdu</h1>
              <p className="text-xs text-gray-500">Performance Tracker</p>
            </div>
          </div>
        </div>

        {/* Sidebar Buttons */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { key: "dashboard", icon: Home, label: "Dashboard" },
            { key: "performance", icon: TrendingUp, label: "Performance" },
            { key: "analytics", icon: BarChart3, label: "Analytics" },
            { key: "students", icon: Users, label: "Students" },
            { key: "messages", icon: MessageSquare, label: "Messages" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSidebarItem(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeSidebarItem === item.key
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-600">Welcome back!</p>
            </div>

            {/* Right icons */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                <Settings className="w-6 h-6" />
              </button>

              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CARDS */}
        <main className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Performance */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-green-600 text-sm font-semibold">+12%</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Overall Performance</h3>
              <p className="text-2xl font-bold text-gray-800">85.5%</p>
            </div>

            {/* Attendance */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-green-600 text-sm font-semibold">+5%</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Attendance</h3>
              <p className="text-2xl font-bold text-gray-800">92%</p>
            </div>

            {/* Study Hours */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-blue-600 text-sm font-semibold">Avg</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Study Hours</h3>
              <p className="text-2xl font-bold text-gray-800">4.5 hrs</p>
            </div>

            {/* Rank */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-green-600 text-sm font-semibold">Top 10%</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Class Rank</h3>
              <p className="text-2xl font-bold text-gray-800">8th</p>
            </div>
          </div>

          {/* TREND + SUBJECT ANALYSIS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trend */}
            <div className="bg-white rounded-2xl p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Performance Trend
                </h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>

              {/* Hard-coded bars (your original UI) */}
              <div className="h-64 bg-gradient-to-t from-blue-50 rounded-xl flex items-end justify-around p-4">
                {[
                  65, 72, 68, 78, 82, 85, 88,
                ].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div
                      className="w-12 bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-600">
                      W{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Analysis */}
            <div className="bg-white rounded-2xl p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Subject Analysis
                </h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                {[
                  { name: "Mathematics", value: 92, color: "bg-blue-600" },
                  { name: "Physics", value: 85, color: "bg-purple-600" },
                  { name: "Chemistry", value: 88, color: "bg-green-600" },
                  { name: "Computer Science", value: 95, color: "bg-orange-600" },
                  { name: "English", value: 78, color: "bg-pink-600" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
