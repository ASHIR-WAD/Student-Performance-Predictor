import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";   // ← REQUIRED IMPORT

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (p) => p && p.length >= 6;

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();         // ← NOW IT WORKS

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Full name is required.");
    if (!validateEmail(email)) return setError("Enter a valid email.");
    if (!validatePassword(password))
      return setError("Password must be at least 6 characters.");

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, { displayName: name });

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create account.");
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border p-2"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border p-2"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-md border p-2"
          placeholder="At least 6 characters"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <div className="mt-1 flex gap-4">
          <label
            className={`p-2 rounded-md border ${
              role === "student" ? "bg-sky-50 border-sky-300" : ""
            }`}
          >
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />{" "}
            Student
          </label>

          <label
            className={`p-2 rounded-md border ${
              role === "faculty" ? "bg-sky-50 border-sky-300" : ""
            }`}
          >
            <input
              type="radio"
              name="role"
              value="faculty"
              checked={role === "faculty"}
              onChange={() => setRole("faculty")}
            />{" "}
            Faculty
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button className="w-full py-2 rounded-lg bg-sky-600 text-white font-semibold">
          Create account
        </button>
      </div>
    </form>
  );
}
