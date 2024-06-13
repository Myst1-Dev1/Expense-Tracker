'use client'

import { SideBar } from "@/components/SideBar";
import { auth } from "@/services/firebase";
import { FaCalendarAlt, FaComment, FaTrashAlt } from "react-icons/fa";
import { useUserStore } from "@/services/userStore";
import { SalaryBalance } from "@/services/salaryBalance";
import { formatPrice } from "@/utils/formatNumber";
import { formatData } from "@/utils/formatDate";
import * as actions from '@/actions/addData'

export default function Income() {
    const { currentUser, deleteIncome, isLoading } = useUserStore();
    const { totalSalary } = SalaryBalance();

    const uid:any = auth.currentUser?.uid;

    const handleDeleteIncome = (income:null | any) => {
         deleteIncome(uid, income);
    }

    const addIncomeAction = actions.handleAddIncomeToDataBase.bind(null, uid);

    return (
        <div className="flex lg:flex-row lg:p-[20px] lg:gap-[50px] sm: gap-[20px] sm: p-[10px] sm: flex-col">
            <SideBar />
            <div className="flex-[1] bg-[#303030] p-5 rounded-[20px] w-full lg:h-screen sm: h-100vh">
                <h1 className="font-bold lg:text-3xl sm: text-xl">Rendimentos</h1>
                <div className="mt-5 bg-[#373737] w-full p-4 rounded-[10px]">
                    <h2 className="font-bold text-center lg:text-2xl sm: text-xl">Total de rendimentos: <span className="text-lime-500">{formatPrice(totalSalary)}</span></h2>
                </div>
                <div className="mt-7 grid lg:grid-cols-2 sm: grid-cols-1">
                    <form action={addIncomeAction} className="lg:max-w-96 grid grid-cols-1 gap-5 sm: w-full">
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" type="text" name="title" placeholder="Titulo do salário" required />
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" type="number" name="value" placeholder="Valor do salário" required />
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" name="date" type="date" placeholder="Data do recebimento" required />
                        <textarea className="resize-none border p-3 bg-transparent border-[#595858] h-[150px] w-full outline-none" name="comment" placeholder="Comentário" required />
                        <button className="mb-5 h-[50px] w-full rounded-[20px] bg-indigo-500 border-none hover:bg-indigo-700 transition-colors font-bold">
                        {isLoading ?  
                            <div role="status" className="flex justify-center items-center m-auto">
                                <svg aria-hidden="true" className="m-auto inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            : '+ Adicionar rendimento'}
                        </button>
                    </form>
                    <div className="flex flex-col gap-5 overflow-y-auto h-[370px] scrollbar-custom">
                    {isLoading ? 'carregando...' : currentUser?.incomes.map((income, index) => (
                        <div key={index} className="relative flex justify-between items-center bg-[#373737] rounded-[10px] p-4 w-full">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="lg:w-[20px] lg:h-[20px] rounded-full bg-lime-500 sm: w-[10px] h-[10px]"></div>
                                    <h5 className="text-indigo-400 font-bold lg:text-xl sm: text-sm">{income.title}</h5>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <div className="flex items-center gap-1">
                                        {/* <FaDollarSign className="text-indigo-400 lg:text-sm sm: text-[9px]" /> */}
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">{formatPrice(Number(income.value))}</h6>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">{formatData(income.date)}</h6>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaComment className="flex-shrink-0 text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">{income.comment}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 bg-indigo-400 text-white rounded-full lg:w-[40px] lg:h-[40px] flex items-center justify-center cursor-pointer sm: w-[20px] h-[20px]"
                                onClick={() => handleDeleteIncome(income)}
                            >
                                <FaTrashAlt className="lg:text-xl sm: text-[10px]" />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}