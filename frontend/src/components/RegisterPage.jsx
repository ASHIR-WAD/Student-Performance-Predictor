import React from "react";
import SignupForm from "./SignupForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-white to-slate-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-2">Register - Student / Faculty</h2>
        <p className="text-sm text-gray-500 mb-4">
          Fill the form to create an account
        </p>
        <SignupForm />
      </div>
    </div>
  );
}
