import { useCallback, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth, isConfigured } from "../lib/firebase";

const LOCAL_USER = { uid: "local", displayName: "Local demo" };

const AUTH_ERROR_MESSAGES = {
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/invalid-email": "That doesn't look like a valid email address.",
  "auth/user-not-found": "Email or password is incorrect.",
  "auth/wrong-password": "Email or password is incorrect.",
  "auth/too-many-requests": "Too many attempts. Wait a bit and try again.",
};

export function useAuth() {
  const [user, setUser] = useState(isConfigured ? null : LOCAL_USER);
  const [ready, setReady] = useState(!isConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isConfigured) return undefined;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
  }, []);

  const signIn = useCallback(async (email, password) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (e) {
      setError(AUTH_ERROR_MESSAGES[e.code] || "Couldn't sign in. Try again.");
      return false;
    }
  }, []);

  const signOut = useCallback(() => fbSignOut(auth), []);

  return { user, ready, error, signIn, signOut };
}
