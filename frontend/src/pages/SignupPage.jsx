import React, { useState } from "react";
import axios from "axios";   // <-- Added
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  User,
  Award,
  BookOpen,
  FileText,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  // <-- Backend ENV URL

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");

  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
    usn: "",
    semester: "",
    designation: "",
    department: "",
    subject: "",
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...signupData,
        role: userType,
      };

      const response = await axios.post(`${BACKEND_URL}/signup`, payload);

      if (response.status === 200 || response.status === 201) {
      alert(response.data.message || "Signup Successful");

      if (userType === "student") {
          navigate("/student-dashboard", { state: { userType: "student" } });
        } else if (userType === "faculty") {
          navigate("/faculty-dashboard", { state: { userType: "faculty" } });
        }
      } else {
        alert(response.data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error: " + (error.response?.data?.message || "Try again later"));
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <div className="text-center mb-8">
         {/* Back to Home (left aligned and spaced properly) */}
{/* Back Button (LEFT aligned, separate row) */}
<div className="w-full max-w-xl mx-auto mb-4">
  <button
    onClick={() => navigate("/")}
    className="flex items-center text-blue-600 font-medium hover:text-blue-700"
  >
    <ChevronLeft className="w-5 h-5 mr-1" />
    Back to Home
  </button>
</div>

{/* Logo (CENTERED) */}
<div className="flex justify-center w-full mb-6 mt-2">
  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 
    rounded-2xl flex items-center justify-center shadow-lg">
    <GraduationCap className="w-8 h-8 text-white" />
  </div>
</div>
</div>



        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setUserType("student")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                userType === "student"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <User className="w-5 h-5 inline mr-2" />
              Student
            </button>

            <button
              onClick={() => setUserType("faculty")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                userType === "faculty"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Award className="w-5 h-5 inline mr-2" />
              Faculty
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Student Fields (UPDATED — attendance & study hours REMOVED) */}
            {userType === "student" && (
              <div className="grid md:grid-cols-2 gap-5">
                {/* USN */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    USN
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="usn"
                      value={signupData.usn}
                      onChange={handleSignupChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter USN"
                      required
                    />
                  </div>
                </div>

                {/* Semester */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Semester
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="semester"
                      value={signupData.semester}
                      onChange={handleSignupChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Semester</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={s}>
                          Semester {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Faculty Fields */}
            {userType === "faculty" && (
              <div className="grid md:grid-cols-2 gap-5">
                {/* Designation */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Designation
                  </label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="designation"
                      value={signupData.designation}
                      onChange={handleSignupChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Assistant Professor"
                      required
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Department
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="department"
                      value={signupData.department}
                      onChange={handleSignupChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter department"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="subject"
                      value={signupData.subject}
                      onChange={handleSignupChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter subject"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
