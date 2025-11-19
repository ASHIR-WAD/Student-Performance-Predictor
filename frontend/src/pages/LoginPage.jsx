import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, GraduationCap, ChevronLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Read userType from navigation state
  const userType = location.state?.userType || "student";

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center px-4 py-12">

      {/* Back to Home (placed higher and separated from logo) */}
<div className="w-full max-w-md mb-4">
  <button
    onClick={() => navigate("/")}
    className="flex items-center text-blue-600 font-medium"
  >
    <ChevronLeft className="w-5 h-5 mr-1" />
    Back to Home
  </button>
</div>

{/* Logo Box */}
<div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 
  rounded-2xl flex items-center justify-center shadow-lg mb-6 mt-2">
  <GraduationCap className="w-8 h-8 text-white" />
</div>


      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back</h2>
      <p className="text-gray-600 mb-10">
        Sign in as {userType === "faculty" ? "Faculty" : "Student"}
      </p>

      {/* Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-12 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-12 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup", { state: { userType } })}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
