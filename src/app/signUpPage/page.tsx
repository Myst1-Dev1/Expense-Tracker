'use client';

import Image from 'next/image';
import Link from 'next/link';
import uploadImage from '../../../public/images/uploadImage.png';
import { FaEnvelope, FaLock, FaUpload, FaUser } from 'react-icons/fa';
import { Auth } from '@/services/auth';

export default function SignUpPage() {
  const { createUser, error ,handleAvatar, avatar, isLoading } = Auth();

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
          <button className='border-none bg-indigo-600 w-full h-[50px] text-xl hover:bg-indigo-700 transition-all font-bold'>
            {isLoading ?  
            <div role="status" className="flex justify-center items-center m-auto">
                <svg aria-hidden="true" className="m-auto inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            : 'Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
}
