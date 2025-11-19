import React, { useState } from "react";
import axios from "axios";
import {
  ChevronLeft,
  TrendingUp,
  Clock,
  Award,
  Target,
  Sparkles,
  Users,
} from "lucide-react";

export default function SubmitDataPage() {
  const [form, setForm] = useState({
    attendance: "",
    studyHours: "",
    iatMarks: "",
    assignmentMarks: "",
    extracurricular: "",
    consistency: 5,
  });

  const [errors, setErrors] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const validateForm = () => {
    let temp = {};

    if (form.attendance < 0 || form.attendance > 100)
      temp.attendance = "Attendance must be between 0 and 100.";

    if (form.studyHours < 0 || form.studyHours > 24)
      temp.studyHours = "Study hours must be between 0 and 24.";

    if (form.iatMarks < 0 || form.iatMarks > 100)
      temp.iatMarks = "IAT Marks must be between 0 and 100.";

    if (form.assignmentMarks < 0 || form.assignmentMarks > 100)
      temp.assignmentMarks = "Assignment marks must be between 0 and 100.";

    if (!isNaN(form.extracurricular))
      temp.extracurricular = "Extracurricular must contain text.";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please correct the errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      console.log(form);
      const res = await axios.post(`${BACKEND_URL}/predict`, form, {
        headers: { "Content-Type": "application/json" },
      });

      setResponseData(res.data); // must include: predicted_grade, confidence_level, prediction
      console.log("Backend response:", res.data);

    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getConsistencyColor = (value) => {
    if (value >= 8) return "from-green-500 to-emerald-600";
    if (value >= 5) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 px-4 py-8 max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-gray-700 font-semibold mb-8 hover:text-purple-600 transition"
        >
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-purple-100 transition">
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

          {/* Right Side — Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-2xl p-8">

              <h1 className="text-3xl font-black text-gray-800 mb-2">
                Submit Your Data 📊
              </h1>
              <p className="text-gray-600 mb-8">
                Fill in your details to get AI-powered insights
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Attendance */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Users className="w-4 h-4 text-purple-600" />
                    Attendance (%)
                  </label>
                  <input
                    type="number"
                    name="attendance"
                    value={form.attendance}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 rounded-xl ${
                      errors.attendance ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                    placeholder="0 - 100"
                  />
                  {errors.attendance && <p className="text-red-600 text-sm">{errors.attendance}</p>}
                </div>

                {/* Study Hours */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Study Hours (per day)
                  </label>
                  <input
                    type="number"
                    name="studyHours"
                    value={form.studyHours}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 rounded-xl ${
                      errors.studyHours ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                    placeholder="0 - 24"
                  />
                  {errors.studyHours && <p className="text-red-600 text-sm">{errors.studyHours}</p>}
                </div>

                {/* IAT + Assignment */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* IAT */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Award className="w-4 h-4 text-green-600" />
                      IAT Marks
                    </label>
                    <input
                      type="number"
                      name="iatMarks"
                      value={form.iatMarks}
                      onChange={handleChange}
                      className={`w-full p-4 border-2 rounded-xl ${
                        errors.iatMarks ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                      }`}
                      placeholder="0 - 100"
                    />
                    {errors.iatMarks && (
                      <p className="text-red-600 text-sm">{errors.iatMarks}</p>
                    )}
                  </div>

                  {/* Assignment Marks */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Target className="w-4 h-4 text-orange-600" />
                      Assignment Marks
                    </label>
                    <input
                      type="number"
                      name="assignmentMarks"
                      value={form.assignmentMarks}
                      onChange={handleChange}
                      className={`w-full p-4 border-2 rounded-xl ${
                        errors.assignmentMarks
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                      placeholder="0 - 100"
                    />
                    {errors.assignmentMarks && (
                      <p className="text-red-600 text-sm">{errors.assignmentMarks}</p>
                    )}
                  </div>
                </div>

                {/* Extra Curricular */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    Extra Curricular
                  </label>
                  <textarea
                    name="extracurricular"
                    value={form.extracurricular}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 rounded-xl ${
                      errors.extracurricular
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    rows="4"
                    placeholder="Sports, cultural events…"
                  />
                  {errors.extracurricular && (
                    <p className="text-red-600 text-sm">{errors.extracurricular}</p>
                  )}
                </div>

                {/* Consistency Slider */}
                <div className="bg-purple-50 p-6 rounded-xl border">
                  <label className="flex items-center justify-between text-gray-700 font-semibold mb-4">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      Consistency (1–10)
                    </span>
                    <span
                      className={`text-xl font-black bg-gradient-to-r ${getConsistencyColor(
                        form.consistency
                      )} text-transparent bg-clip-text`}
                    >
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
                    className="w-full"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl"
                >
                  {loading ? "Generating..." : "Generate AI Insights"}
                </button>
              </form>

              {/* Prediction Result */}
              {responseData && (
                <div className="mt-10 p-8 bg-white border-2 border-purple-300 rounded-3xl shadow-xl animate-fadeIn">

                  <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    🎉 AI Insights Ready!
                  </h2>

                  <div className="grid md:grid-cols-3 gap-6">

                    {/* Grade */}
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-6 text-center">
                      <p className="text-lg opacity-90">Predicted Grade</p>
                      <h3 className="text-5xl font-black mt-2">
                        {responseData.predicted_grade}
                      </h3>
                    </div>

                    {/* Pass / Fail */}
                    <div
                      className={`rounded-2xl p-6 text-center border-2 shadow-lg ${
                        responseData.prediction === "Pass"
                          ? "bg-green-50 border-green-400"
                          : "bg-red-50 border-red-400"
                      }`}
                    >
                      <p className="text-lg text-gray-700">Prediction</p>
                      <h3
                        className={`text-4xl font-black mt-2 ${
                          responseData.prediction === "Pass"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {responseData.prediction}
                      </h3>
                    </div>

                    {/* Confidence text */}
<h3 className="text-4xl font-black text-blue-600 mt-2">
  {responseData.confidence_level.toFixed(2)}%
</h3>

{/* Progress bar */}
<div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
    style={{
      width: `${responseData.confidence_level}%`,
    }}
  ></div>
</div>

                    </div>
                  </div>
                
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}