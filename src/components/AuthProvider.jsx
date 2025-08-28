import { createContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Ctx = createContext(null);
export { Ctx };

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
      if (u) {
        setDoc(doc(db, "users", u.uid), {
          email: u.email || null,
          displayName: u.displayName || null,
          photoURL: u.photoURL || null,
          updatedAt: serverTimestamp(),
        }, { merge: true }).catch(console.error);
      }
    });
    return unsub;
  }, []);

  const login = async () => { await signInWithPopup(auth, googleProvider); };
  const logout = async () => { await signOut(auth); };

  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>;
}
