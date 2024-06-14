import * as deleteActions from '@/actions/deleteData';
import { FaTrashAlt } from 'react-icons/fa';

interface DeleteDataProps {
    value:[] | any;
    uid:string;
    functionArgument:string;
}

export function DeleteData({value, uid, functionArgument}: DeleteDataProps) {
    const deleteIncomeAction:any = deleteActions.deleteIncome.bind(null,uid, value);
    const deleteExpenseAction:any = deleteActions.deleteExpenses.bind(null,uid, value);

    return (
        <>
            <form action={functionArgument === 'income' ? deleteIncomeAction : deleteExpenseAction}>
                <button type="submit" className="absolute top-4 right-4 bg-indigo-400 text-white rounded-full lg:w-[40px] lg:h-[40px] flex items-center justify-center cursor-pointer sm: w-[20px] h-[20px]">
                    <FaTrashAlt className="lg:text-xl sm: text-[10px]" />
                </button>
            </form>
        </>
    )
}