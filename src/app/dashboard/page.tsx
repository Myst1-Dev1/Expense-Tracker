'use client';

import { SideBar } from "@/components/SideBar"
import ApexCharts from "apexcharts";
import dynamic from "next/dynamic";

export default function Dashboard() {
    const Chart = dynamic(() => import('react-apexcharts'), {
        ssr: false,
    });
    
    const options:ApexCharts.ApexOptions | undefined = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            },
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories:["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "july"],
            labels: {
                style: {
                    colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: ['#fff']
                }
            }
        },
        tooltip: {
            enabled:true,
            followCursor:true,
            fillSeriesColor:true,
        },
        dataLabels: {
            enabled:false,
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        colors:["#6366F1"],
    }
    
    const series = [
        {
            name: "Renda",
            data: [30, 40, 45, 50, 49, 60, 85],
        }
      ]

    return (
        <div className="flex lg:p-[20px] lg:gap-[50px] sm: gap-[20px] sm: p-[10px]">
            <SideBar />
            <div className="flex-[1] bg-[#303030] p-5 rounded-[20px] w-full lg:h-screen sm: h-100vh">
                <h1 className="font-bold lg:text-3xl sm: text-xl">Total de transações</h1>
                <div className="grid gap-8 lg:grid-cols-2  sm: grid-cols-1">
                    <div>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            width="100%"
                            height={320}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-5">Histórico recente</h2>
                        <div className="grid grid-cols-1 gap-5">
                            <div className="p-4 bg-[#373737] w-full flex justify-between items-center rounded-[10px]">
                                <h6 className="text-red-500 font-bold sm: text-sm">Das Mei</h6>
                                <h6 className="text-red-500 font-bold sm: text-sm">-R$:76,00</h6>
                            </div>
                            <div className="p-4 bg-[#373737] w-full flex justify-between items-center rounded-[10px]">
                                <h6 className="text-red-500 font-bold sm: text-sm">Faculdade</h6>
                                <h6 className="text-red-500 font-bold sm: text-sm">-R$:74,00</h6>
                            </div>
                            <div className="p-4 bg-[#373737] w-full flex justify-between items-center rounded-[10px]">
                                <h6 className="text-lime-500 font-bold sm: text-sm">Salário</h6>
                                <h6 className="text-lime-500 font-bold sm: text-sm">-R$:1500,00</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid gap-5 lg:grid-cols-3 sm: grid-cols-1">
                    <div className="bg-[#373737] w-full flex flex-col justify-center items-center p-4 rounded-[20px]">
                        <h5 className="text-indigo-400 font-bold">Total de rendimentos</h5>
                        <h6 className="text-lime-500 font-bold">R$:100,00</h6>
                    </div>
                    <div className="bg-[#373737] w-full flex flex-col justify-center items-center p-4 rounded-[20px]">
                        <h5 className="text-indigo-400 font-bold">Total de gastos</h5>
                        <h6 className="text-red-500 font-bold">R$:10,00</h6>
                    </div>
                    <div className="bg-[#373737] w-full flex flex-col justify-center items-center p-4 rounded-[20px]">
                        <h5 className="text-indigo-400 font-bold">Balanço total</h5>
                        <h6 className="text-lime-500 font-bold">R$:90,00</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}