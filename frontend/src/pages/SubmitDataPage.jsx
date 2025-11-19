import React, { useState } from "react";
import { ChevronLeft, TrendingUp, Clock, Award, Target, Sparkles, Users } from "lucide-react";

export default function SubmitDataPage() {
  const [form, setForm] = useState({
    attendance: "",
    studyHours: "",
    iatMarks: "",
    assignmentMarks: "",
    extracurricular: "",
    consistency: 5,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
    alert("Data submitted! Insights will be generated soon.");
  };

  const getConsistencyColor = (value) => {
    if (value >= 8) return "from-green-500 to-emerald-600";
    if (value >= 5) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Subtle animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-4 py-8 max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-gray-700 font-semibold mb-8 hover:text-purple-600 transition-colors duration-300"
        >
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-purple-100 transition-colors duration-300">
            <ChevronLeft className="w-5 h-5" />
          </div>
          Back to Dashboard
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Side - Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Main Header Card */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl shadow-xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">AI Insights</h2>
              </div>
              <p className="text-purple-100 text-sm leading-relaxed">
                Submit your academic data and get personalized recommendations powered by AI
              </p>
            </div>

            {/* Info Cards */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Track Progress</h3>
                  <p className="text-sm text-gray-600">Monitor your academic growth over time</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Set Goals</h3>
                  <p className="text-sm text-gray-600">Get personalized improvement targets</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Earn Insights</h3>
                  <p className="text-sm text-gray-600">Unlock detailed analytics & tips</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
              
              <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-800 mb-2">
                  Submit Your Data 📊
                </h1>
                <p className="text-gray-600">Fill in your academic details to generate AI-powered insights</p>
              </div>

              <div className="space-y-6">

                {/* Attendance */}
                <div className="group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    Attendance (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="attendance"
                      value={form.attendance}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300"
                      placeholder="Enter attendance percentage (0-100)"
                      min="0"
                      max="100"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                      %
                    </div>
                  </div>
                </div>

                {/* Study Hours */}
                <div className="group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Study Hours (per day)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="studyHours"
                      value={form.studyHours}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                      placeholder="Enter average daily study time"
                      min="0"
                      max="24"
                      step="0.5"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                      hrs
                    </div>
                  </div>
                </div>

                {/* Two Column Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* IAT Marks */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Award className="w-4 h-4 text-green-600" />
                      IAT Marks
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="iatMarks"
                        value={form.iatMarks}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300"
                        placeholder="Score"
                        min="0"
                        max="100"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        /100
                      </div>
                    </div>
                  </div>

                  {/* Assignment Marks */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      Assignment Marks
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="assignmentMarks"
                        value={form.assignmentMarks}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
                        placeholder="Score"
                        min="0"
                        max="100"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        /100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra Curricular */}
                <div className="group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    Extra-Curricular Activities
                  </label>
                  <textarea
                    name="extracurricular"
                    value={form.extracurricular}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 resize-none"
                    rows="4"
                    placeholder="e.g., NCC, Sports, Cultural Activities, Volunteering, Clubs..."
                  />
                </div>

                {/* Consistency Rating */}
                <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                  <label className="flex items-center justify-between text-gray-700 font-semibold mb-4">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      Consistency Rating
                    </span>
                    <span className={`text-2xl font-black bg-gradient-to-r ${getConsistencyColor(form.consistency)} text-transparent bg-clip-text`}>
                      {form.consistency}/10
                    </span>
                  </label>

                  <input
                    type="range"
                    name="consistency"
                    min="1"
                    max="10"
                    value={form.consistency}
                    onChange={handleChange}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-600"
                    style={{
                      background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(147 51 234) ${(form.consistency - 1) * 11.11}%, rgb(229 231 235) ${(form.consistency - 1) * 11.11}%, rgb(229 231 235) 100%)`
                    }}
                  />
                  
                  <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="group relative w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Generate AI Insights
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <p className="text-center text-sm text-gray-500">
                  🔒 Your data is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}