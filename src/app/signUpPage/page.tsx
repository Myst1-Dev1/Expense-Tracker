'use client';

import Image from 'next/image';
import Link from 'next/link';
import uploadImage from '../../../public/images/uploadImage.png';
import { FaEnvelope, FaLock, FaUpload, FaUser } from 'react-icons/fa';
import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/services/firebase';
import { upload } from '@/services/upload';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  });
  const [error, setError] = useState(false);

  const router = useRouter();

  function handleAvatar(e: FormEvent | any) {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  }

  async function createUser(e: FormEvent | any) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const formEntries = Object.fromEntries(formData.entries());
      const { nome, email, password, confirm_password } = formEntries as { [key: string]: string };

      if (password !== confirm_password) {
        return setError(true);
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, 'users', res.user.uid), {
        nome,
        email,
        password,
        avatar: imgUrl,
        expenses: [],
        incomes: []
      });

      router.push('/');
    } catch (error) {
      console.log('tivemos um erro', error);
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="m-auto max-w-96 w-full grid grid-cols-1 items-center justify-center p-4 bg-[#303030] rounded-xl">
        <h1 className="text-3xl m-auto">Expense <span className="text-indigo-500">Admin</span></h1>
        <form onSubmit={createUser} className="mt-5 flex flex-col justify-center items-center gap-6">
          <div className='w-full'>
            <div className='flex justify-between items-center'>
              <Image className='rounded-full' height={60} width={60} src={avatar.url || uploadImage} alt='imagem de upload' />
              <label htmlFor="file" className='cursor-pointer'><FaUpload /></label>
            </div>
            <input type="file" name='file' id='file' className='hidden' onChange={handleAvatar} />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="text" name='nome' placeholder="Nome" />
            <FaUser className='text-indigo-500' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="email" name='email' placeholder="Email" />
            <FaEnvelope className='text-indigo-500' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="password" name='password' placeholder="Senha" />
            <FaLock className='text-indigo-500' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="password" name='confirm_password' placeholder="Confirme a senha" />
            <FaLock className='text-indigo-500' />
          </div>
          {error && <span className='text-red-600'>As senhas não coincidem</span>}
          <span className='m-auto'>Já possui uma conta? <Link href="/" className='text-indigo-500 hover:text-indigo-700 transition-colors'>Entrar</Link></span>
          <button className='border-none bg-indigo-600 w-full h-[50px] text-xl hover:bg-indigo-700 transition-all font-bold'>Cadastro</button>
        </form>
      </div>
    </div>
  );
}
