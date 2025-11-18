// src/utils/authProviders.js
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";

/**
 * Sign in with Google (popup).
 * - Creates a Firestore user document at /users/{uid} if it doesn't exist.
 * - You can change the default role handling here (currently default: 'student').
 *
 * Returns the Firebase user credential (same shape as signInWithPopup).
 */
export async function signInWithGoogleAndCreateProfile() {
  const cred = await signInWithPopup(auth, googleProvider);
  const user = cred.user;

  // ensure user doc exists
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    // Default role set to 'student' — change this if you want to prompt or set 'pending'.
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      role: "student",
      provider: "google",
      createdAt: new Date().toISOString(),
    });
  }

  return cred;
}
