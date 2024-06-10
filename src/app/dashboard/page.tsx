'use client';

import { SideBar } from "@/components/SideBar"
import { SalaryBalance } from "@/services/salaryBalance";
import { formatPrice } from "@/utils/formatNumber";

import ApexCharts from "apexcharts";

import dynamic from "next/dynamic";

export default function Dashboard() {
    const { totalExpense, totalSalary, balance, recentHistoric, monthNames, incomesGraphValue, expensesGraphValue} = SalaryBalance();

    const Chart = dynamic(() => import('react-apexcharts'), {
        ssr: false,
    });
 
    const options: ApexCharts.ApexOptions | undefined = {
    chart: {
        type: 'line',
        toolbar: {
        show: false
        },
    },
    xaxis: {
        categories: monthNames,
        labels: {
            style: {
              colors: ['#fff', "#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff"], // White text color
              fontWeight: 400
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
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
    },
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        bar: {
        horizontal: false
        }
    },
    colors: [
        '#84cc16',
        '#ef4444',
    ],
    };
    
    const series: any = [
    {
        name: "Renda",
        data: incomesGraphValue,
    },
    {
        name: "Despesa",
        data: expensesGraphValue,
    }
    ];

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
                            type="line"
                            width="100%"
                            height={320}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-5">Histórico recente</h2>
                        <div className="grid grid-cols-1 overflow-y-auto h-[250px] scrollbar-custom gap-5">
                            {recentHistoric.map(historic => (
                                <div key={historic.title} className="p-4 bg-[#373737] w-full flex justify-between items-center rounded-[10px]">
                                    <h6 className={`${historic.type === 'expense' ? 'text-red-500' : 'text-lime-500'} font-bold sm: text-sm`}>{historic.title}</h6>
                                    <h6 className={`${historic.type === 'expense' ? 'text-red-500' : 'text-lime-500'} font-bold sm: text-sm`}>{formatPrice(Number(historic.value))}</h6>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid gap-5 lg:grid-cols-3 sm: grid-cols-1">
                    <div className="bg-[#373737] w-full flex flex-col justify-center items-center p-4 rounded-[20px]">
                        <h5 className="text-indigo-400 font-bold">Total de rendimentos</h5>
                        <h6 className="text-lime-500 font-bold">{formatPrice(totalSalary)}</h6>
                    </div>
                    <div className="bg-[#373737] w-full flex flex-col justify-center items-center p-4 rounded-[20px]">
                        <h5 className="text-indigo-400 font-bold">Total de gastos</h5>
                        <h6 className="text-red-500 font-bold">{formatPrice(totalExpense)}</h6>
                    </div>
                    <div className="bg-[#373737] w-full flex flex-col justify-center items-center p-4 rounded-[20px]">
                        <h5 className="text-indigo-400 font-bold">Balanço total</h5>
                        <h6 className="text-lime-500 font-bold">{formatPrice(balance)}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}