import Image from 'next/image';
import Link from 'next/link';
import uploadImage from '../../../public/images/uploadImage.png'
import { FaEnvelope, FaLock, FaUpload, FaUser } from 'react-icons/fa';

export default function SignUpPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="m-auto max-w-96 w-full grid grid-cols-1 items-center justify-center p-4 bg-[#303030] rounded-xl">
        <h1 className="text-3xl m-auto">Expense <span className="text-indigo-500">Admin</span></h1>
        <form className="mt-5 flex flex-col justify-center items-center gap-6">
          <div className='w-full'>
            <div className='flex justify-between items-center'>
              <Image className='rounded-full' height={60} width={60} src={uploadImage} alt='imagem de upload' />
              <label htmlFor="file" className='cursor-pointer'><FaUpload /></label>
            </div>
            <input type="file" id='file' className='hidden' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="text" placeholder="Nome"/>
            <FaUser className='text-indigo-500' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="email" placeholder="Email"/>
            <FaEnvelope className='text-indigo-500' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="password" placeholder="Senha"/>
            <FaLock className='text-indigo-500' />
          </div>
          <div className="flex justify-between items-center p-4 border border-[#595858] w-full h-[50px]">
            <input className="bg-transparent border-none outline-none" type="password" placeholder="Confirme a senha"/>
            <FaLock className='text-indigo-500' />
          </div>
          <span className='m-auto'>Já possui uma conta? <Link href="/" className='text-indigo-500 hover:text-indigo-700 transition-colors'>Entrar</Link></span>
          <button className='border-none bg-indigo-600 w-full h-[50px] text-xl hover:bg-indigo-700 transition-all font-bold'>Cadastro</button>
        </form>
      </div>
    </div>
  );
}
