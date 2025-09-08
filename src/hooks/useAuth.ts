"use client";
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from '@/lib/firebase/client';
import { doc, setDoc } from 'firebase/firestore';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        await setDoc(doc(db, 'users', u.uid), {
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL,
          createdAt: Date.now(),
        }, { merge: true });
      }
    });
    return () => unsub();
  }, []);

  async function signInEmail(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }
  async function signUpEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }
  async function signInGoogle() {
    await signInWithPopup(auth, googleProvider);
  }
  async function logout() {
    await signOut(auth);
  }

  return { user, loading, signInEmail, signUpEmail, signInGoogle, logout };
}


