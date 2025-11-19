import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const previousActivity = [
    { action: "Completed Physics Assignment", time: "2 hours ago", icon: "✅" },
    { action: "Attended Math Lecture", time: "5 hours ago", icon: "📚" },
    { action: "Scored 95% in Chemistry Test", time: "1 day ago", icon: "🌟" }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-purple-500/30">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">
              ✨ Welcome Back, Student!
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 drop-shadow-2xl">
              Your Academic Hub
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your progress, manage assignments, and unlock your full potential with AI-powered insights
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-[2px] rounded-3xl shadow-2xl">
            <div className="bg-white backdrop-blur-xl rounded-3xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    📊 Submit Your Academic Data
                  </h2>
                  <p className="text-gray-600">
                    Upload your information to get personalized AI insights
                  </p>
                </div>
                <div className="bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/40">
                  <span className="text-yellow-600 text-sm font-semibold">🔥 New</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 mb-6 border border-purple-200">
                <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">📁</span> What you can upload:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {["Attendance Records", "Grade Sheets", "Study Schedules", "Assignment Scores"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button with Navigation */}
              <button
                onClick={() => navigate("/submit-data")}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Submit Your Data Now
                  <span className="group-hover:translate-x-1 transition-transform">✨</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                🔒 Your data is encrypted and completely secure
              </p>
            </div>
          </div>
        </div>

        {/* Previous Activity */}
        <div className="max-w-4xl mx-auto bg-white backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 justify-center">
            ⚡ Previous Activity
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {previousActivity.map((activity, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-3xl mb-3">{activity.icon}</div>
                <p className="text-gray-800 font-medium text-sm mb-2">{activity.action}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            🚀 More features coming soon: Study Groups, AI Tutor, Performance Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
