import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        setProfile(snap.exists() ? snap.data() : null);
      } else {
        setProfile(null);
      }
    });
    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold">
              Welcome, {profile?.name || user.displayName || "User"}
            </h3>
            <p className="text-sm text-gray-600">
              Role: <span className="font-medium">{profile?.role || "Unknown"}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg border"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Profile</h4>
            <p className="text-sm text-gray-700">Name: {profile?.name}</p>
            <p className="text-sm text-gray-700">Email: {profile?.email}</p>
            <p className="text-sm text-gray-700">
              Joined:{" "}
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleString()
                : "-"}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Shortcuts</h4>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              <li>Update profile (future)</li>
              <li>View courses (future)</li>
              <li>Faculty panel (role-restricted)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
