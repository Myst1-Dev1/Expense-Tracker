'use client'

import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { FormEvent } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  async function handleLogin(e:FormEvent | any) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const formEntries = Object.fromEntries(formData.entries());
      const {email, password } = formEntries as { [key: string]: string };

      await signInWithEmailAndPassword(auth, email, password);

      router.push('/dashboard');
    } catch (error) {
      console.log('tivemos um erro', error);
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="m-auto max-w-96 w-full grid grid-cols-1 items-center justify-center p-4 bg-[#303030] rounded-xl">
        <h1 className="text-3xl m-auto">Expense <span className="text-indigo-500">Admin</span></h1>
        <form onSubmit={handleLogin} className="mt-5 grid grid-cols-1 gap-6">
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" name='email' type="email" placeholder="Email"/>
            <FaEnvelope className='text-indigo-500' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" name='password' type="password" placeholder="Senha"/>
            <FaLock className='text-indigo-500' />
          </div>
          <span className='m-auto'>Não possui uma conta? <Link href="/signUpPage" className='text-indigo-500 hover:text-indigo-700 transition-colors'>Cadastro</Link></span>
          <button className='border-none bg-indigo-600 w-full h-[50px] text-xl hover:bg-indigo-700 transition-all font-bold'>Entrar</button>
        </form>
      </div>
    </div>
  );
}
