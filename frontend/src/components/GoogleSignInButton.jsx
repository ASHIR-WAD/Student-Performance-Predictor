// src/components/GoogleSignInButton.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogleAndCreateProfile } from "../utils/authProviders";

export default function GoogleSignInButton({ label = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogleAndCreateProfile();
      navigate("/dashboard");
    } catch (err) {
      console.error("Google sign-in error:", err);
      // you can replace alert with nicer UI error handling
      alert(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogle}
      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border"
      disabled={loading}
      type="button"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 533.5 544.3"
        aria-hidden
        focusable="false"
      >
        {/* small Google icon (SVG) */}
        <path
          fill="#4285f4"
          d="M533.5 278.4c0-17.1-1.5-34.2-4.6-50.6H272v95.8h147.7c-6.6 36-27.9 66.5-59.6 86.9v72.0h96.4c56.3-51.9 88-128.2 88-204.1z"
        />
        <path
          fill="#34a853"
          d="M272 544.3c79.1 0 145.4-26.1 193.9-70.8l-96.4-72.0c-27.0 18.2-61.6 29-97.5 29-74.9 0-138.4-50.6-161.1-118.6H11.8v74.9C59.9 473.2 158.1 544.3 272 544.3z"
        />
        <path
          fill="#fbbc04"
          d="M110.9 326.8c-9.7-28.5-9.7-59.3 0-87.8V164.1H11.8c-43.6 86.9-43.6 190.6 0 277.5l99.1-74.8z"
        />
        <path
          fill="#ea4335"
          d="M272 107.7c40.1 0 76.1 13.8 104.4 40.9l78.3-78.3C414.6 23.4 345.8 0 272 0 158.1 0 59.9 71.1 11.8 164.1l99.1 74.9C133.6 158.3 197.1 107.7 272 107.7z"
        />
      </svg>
      <span>{loading ? "Signing in..." : label}</span>
    </button>
  );
}
