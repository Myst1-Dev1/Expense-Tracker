'use server';

import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleLogin(formData: FormData) {
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const res = await signInWithEmailAndPassword(auth, email, password);
      cookies().set('userUid', res.user.uid);

    } catch (error) {
      console.log('tivemos um erro', error);
    }

    redirect('/dashboard')
  }