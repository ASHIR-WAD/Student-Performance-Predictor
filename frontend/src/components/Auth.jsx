import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import GoogleSignInButton from "./GoogleSignInButton"; // ⬅ added import

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">
            {isSignup ? "Create an account" : "Welcome back"}
          </h2>
          <p className="text-sm text-gray-500">
            {isSignup ? "Sign up as Student or Faculty" : "Log into your account"}
          </p>
        </div>

        {/* Forms */}
        {isSignup ? <SignupForm /> : <LoginForm />}

        {/* Google Sign-in Button */}
        <div className="my-4">
          <GoogleSignInButton label="Continue with Google" />
        </div>

        {/* Toggle UI */}
        <div className="mt-4 text-center text-sm text-gray-600">
          {isSignup ? (
            <span>
              Already have an account?{" "}
              <button
                className="text-sky-600 font-semibold"
                onClick={() => setIsSignup(false)}
              >
                Log in
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                className="text-sky-600 font-semibold"
                onClick={() => setIsSignup(true)}
              >
                Sign up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
