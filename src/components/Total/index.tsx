'use client'

import { SalaryBalance } from "@/services/salaryBalance";
import { AnimatedNumber } from "@/components/AnimatedNumbers";

interface TotalProps {
    salaryName:string;
}

export function Total({salaryName}:TotalProps) {
    const { totalSalary, totalExpense } = SalaryBalance();
    return (
        <>
            <span className={`${salaryName === 'income' ? 'text-lime-500' : salaryName === 'expenses' ? 'text-red-500' : ''}`}><AnimatedNumber value={(salaryName === 'income' ? totalSalary : totalExpense )} /></span>
        </>
    )
   
}