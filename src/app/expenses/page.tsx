import { SideBar } from "@/components/SideBar";
import { FaCalendarAlt, FaComment, FaDollarSign, FaTrashAlt } from "react-icons/fa";

export default function Expenses() {
    return (
        <div className="flex lg:p-[20px] lg:gap-[50px] sm: gap-[20px] sm: p-[10px]">
            <SideBar />
            <div className="flex-[1] bg-[#303030] p-5 rounded-[20px] w-full lg:h-screen sm: h-100vh">
                <h1 className="font-bold lg:text-3xl sm: text-xl">Rendimentos</h1>
                <div className="mt-5 bg-[#373737] w-full p-4 rounded-[10px]">
                    <h2 className="font-bold text-center lg:text-2xl sm: text-xl">Total de rendimentos: <span className="text-lime-500">R$:500,00</span></h2>
                </div>
                <div className="mt-7 grid lg:grid-cols-2 sm: grid-cols-1">
                    <form className="max-w-96 grid grid-cols-1 gap-5">
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" type="text" placeholder="Titulo do salário" />
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" type="tel" placeholder="Valor do salário" />
                        <input className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" type="text" placeholder="Data do recebimento" />
                        <textarea className="resize-none border p-3 bg-transparent border-[#595858] h-[150px] w-full outline-none" placeholder="Comentário" />
                        <button className="mb-5 h-[50px] w-full rounded-[20px] bg-indigo-500 border-none hover:bg-indigo-700 transition-colors font-bold">+ Adicionar rendimento</button>
                    </form>
                    <div className="flex flex-col gap-5">
                        <div className="relative flex justify-between items-center bg-[#373737] rounded-[10px] p-4 w-full">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="lg:w-[20px] lg:h-[20px] rounded-full bg-red-500 sm: w-[10px] h-[10px]"></div>
                                    <h5 className="text-indigo-400 font-bold lg:text-xl sm: text-sm">Das Mei</h5>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <div className="flex items-center gap-1">
                                        <FaDollarSign className="text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-indigo-400 font-bold lg:text-sm sm: text-[9px]">76,00</h6>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">12/04/2024</h6>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaComment className="flex-shrink-0 text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">Mei mensal</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 bg-indigo-400 text-white rounded-full lg:w-[40px] lg:h-[40px] flex items-center justify-center cursor-pointer sm: w-[20px] h-[20px]">
                                <FaTrashAlt className="lg:text-xl sm: text-[10px]" />
                            </div>
                        </div>
                        <div className="relative flex justify-between items-center bg-[#373737] rounded-[10px] p-4 w-full">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="lg:w-[20px] lg:h-[20px] rounded-full bg-red-500 sm: w-[10px] h-[10px]"></div>
                                    <h5 className="text-indigo-400 font-bold lg:text-xl sm: text-sm">Faculdade</h5>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <div className="flex items-center gap-1">
                                        <FaDollarSign className="text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">74,00</h6>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">12/04/2024</h6>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaComment className="text-indigo-400 lg:text-sm sm: text-[9px]" />
                                        <h6 className="text-sm text-indigo-400 font-bold lg:text-sm sm: text-[9px]">Mensalidade</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 bg-indigo-400 text-white rounded-full lg:w-[40px] lg:h-[40px] flex items-center justify-center cursor-pointer sm: w-[20px] h-[20px]">
                                <FaTrashAlt className="lg:text-xl sm: text-[10px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}