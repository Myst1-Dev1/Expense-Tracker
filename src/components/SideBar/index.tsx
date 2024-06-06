import Image from "next/image"
import userImg from '../../../public/images/userImg.jpg';
import { FaChartLine, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";

export function SideBar() {
    return (
        <div className="flex-1 bg-[#303030] rounded-[20px] h-screen w-full lg:max-w-[200px] sm: max-w-[70px]">
            <div className="flex flex-col h-screen justify-between">
                <div>
                    <div className="flex items-center gap-5 p-5">
                        <Image className="rounded-full flex-shrink-0" width={50} height={50} src={userImg} alt="foto do usuário logado"/>
                        <div className="lg:block sm: hidden">
                            <h2 className="text-indigo-500 font-bold text-xl mb-2">Mike</h2>
                            <h3>R$:0,00</h3>
                        </div>
                    </div>
                    <div className="p-5 mt-[60px] grid grid-cols-1 gap-5">
                        <Link href="/dashboard" className="flex items-center gap-3">
                            <FaChartLine className="text-indigo-500 w-[20px] h-[20px]" />
                            <h6 className="font-bold hover:text-indigo-700 transition-colors lg:block sm: hidden">Painel</h6>
                        </Link>
                        <Link href="#" className="flex items-center gap-3">
                            <FaCreditCard className="text-indigo-500 w-[20px] h-[20px]" />
                            <h6 className="font-bold hover:text-indigo-700 transition-colors lg:block sm: hidden">Transações</h6>
                        </Link>
                        <Link href="/income" className="flex items-center gap-3">
                            <FaMoneyBillTrendUp className="text-indigo-500 w-[20px] h-[20px]" />
                            <h6 className="font-bold hover:text-indigo-700 transition-colors lg:block sm: hidden">Rendimentos</h6>
                        </Link>
                        <Link href="/expenses" className="flex items-center gap-3">
                            <FaMoneyBillTransfer className="text-indigo-500 w-[20px] h-[20px]" />
                            <h6 className="font-bold hover:text-indigo-700 transition-colors lg:block sm: hidden">Despesas</h6>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-5">
                    <FaSignOutAlt className="text-indigo-500 w-[20px] h-[20px]" />
                    <h6 className="cursor-pointer font-bold hover:text-indigo-700 transition-colors lg:block sm: hidden">Sair</h6>
                </div>
            </div>
        </div>
    )
}