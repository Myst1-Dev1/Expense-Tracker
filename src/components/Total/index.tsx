'use client';

import { SalaryBalance } from "@/services/salaryBalance";
import { AnimatedNumber } from "@/components/AnimatedNumbers";

interface TotalProps {
    salaryName: string;
    title: string;
}

export function Total({ salaryName, title }: TotalProps) {
    const { totalSalary, totalExpense } = SalaryBalance();
    const value = salaryName === 'income' ? totalSalary : totalExpense;

    return (
        <h2 className="font-bold text-center lg:text-2xl sm:text-sm">
            Total de {title}:&nbsp;  
            <span className={`${salaryName === 'income' ? 'text-lime-500' : salaryName === 'expenses' ? 'text-red-500' : ''}`}>
                <AnimatedNumber value={value} />
            </span>
        </h2>
    );
}
