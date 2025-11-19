import React, { useState } from "react";
import axios from "axios";   // <-- Added
import {
  Mail,
  Lock,
  User,
  Award,
  GraduationCap,
  ChevronLeft,
  Eye,
  EyeOff,
  BookOpen,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  // <-- Backend ENV URL

  const [userType, setUserType] = useState(defaultUserType);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    usn: "",
    semester: "",
    designation: "",
    department: "",
    subject: "",
    userType,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-10 flex flex-col items-center">
      
      <div className="w-full max-w-2xl mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-600 font-medium"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </button>
      </div>

      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 
        rounded-2xl flex items-center justify-center shadow-lg mb-6">
        <GraduationCap className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-1">Create Account</h2>
      <p className="text-gray-600 mb-8">Sign up as a {userType}</p>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        {/* User Type Switch */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setUserType("student")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              userType === "student"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <User className="w-5 h-5 inline mr-2" /> Student
          </button>

          <button
            onClick={() => setUserType("faculty")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              userType === "faculty"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Award className="w-5 h-5 inline mr-2" /> Faculty
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-12 py-3"
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
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-12 py-3"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Student Fields */}
          {userType === "student" && (
            <div className="grid md:grid-cols-2 gap-5">

              {/* USN */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  USN
                </label>
                <div className="relative mt-1">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="usn"
                    value={form.usn}
                    onChange={handleChange}
                    placeholder="Enter USN"
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-12 py-3"
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

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Designation
                </label>
                <div className="relative mt-1">
                  <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="Assistant Professor etc."
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-12 py-3"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Department
                </label>
                <div className="relative mt-1">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="CSE, ECE, Mech..."
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-12 py-3"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Subject
                </label>
                <div className="relative mt-1">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-12 py-3"
                    required
                  />
                </div>
              </div>

            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login", { state: { userType } })}
            className="text-blue-600 font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
