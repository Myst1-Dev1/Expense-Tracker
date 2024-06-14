'use server'

import { SideBar } from "@/components/SideBar";
import { FaCalendarAlt, FaComment } from "react-icons/fa";
import { formatPrice } from "@/utils/formatNumber";
import { formatData } from "@/utils/formatDate";
import * as actions from '@/actions/addData'
import { fetchUserData } from "@/services/fetchData";
import { Total } from "@/components/Total";
import { DeleteData } from "@/components/DeleteData";
import { cookies } from 'next/headers';
import { FormActionButton } from "@/components/formActionButton";

export default async function Income() {
    const uid:string | any = cookies().get('userUid')?.value;
    const data:any = await fetchUserData(uid);
    
    const addIncomeAction = actions.handleAddIncomeToDataBase.bind(null, uid);

    return (
        <div className="flex lg:flex-row lg:p-[20px] lg:gap-[50px] sm: gap-[20px] sm: p-[10px] sm: flex-col">
            <SideBar />
            <div className="flex-[1] bg-[#303030] p-5 rounded-[20px] w-full lg:h-screen sm: h-100vh">
                <h1 className="font-bold lg:text-3xl sm: text-xl">Rendimentos</h1>
                <div className="mt-5 bg-[#373737] w-full p-4 rounded-[10px]">
                    <Total salaryName='income' title="rendimentos" />
                </div>
                <div className="mt-7 grid lg:grid-cols-2 sm: grid-cols-1">
                    <form action={addIncomeAction} className="lg:max-w-96 grid grid-cols-1 gap-5 sm: w-full">
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" type="text" name="title" placeholder="Titulo do salário" required />
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" type="number" name="value" placeholder="Valor do salário" required />
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" name="date" type="date" placeholder="Data do recebimento" required />
                        <textarea className="resize-none border p-3 bg-transparent border-[#595858] h-[150px] w-full outline-none" name="comment" placeholder="Comentário" required />
                        <FormActionButton />
                    </form>
                    <div className="flex flex-col gap-5 overflow-y-auto h-[370px] scrollbar-custom">
                    {data?.incomes.map((income:any, index:any) => (
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
                            <DeleteData uid={uid} value={income} functionArgument="income" />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}