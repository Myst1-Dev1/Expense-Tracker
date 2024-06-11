import { useUserStore } from "./userStore";

export function SalaryBalance() {
    const { currentUser } = useUserStore();

    const incomes = currentUser?.incomes ?? [];
    const expenses = currentUser?.expenses ?? [];
    const recentHistoric = [...incomes, ...expenses];

    const totalSalary = incomes
  .filter(income => income.type === 'income')
  .reduce((acc, income) => acc + parseFloat(income.value), 0);

  const totalExpense = expenses
  .filter(expense => expense.type === 'expense')
  .reduce((acc, expense) => acc + parseFloat(expense.value), 0);

  const balance = totalSalary - totalExpense;

   
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
];

const convertDateToMonthName = (dateString: string | any) => {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    return months[monthIndex];
};

const incomesByMonth = months.reduce((acc:any, month) => {
    acc[month] = 0;
    return acc;
}, {});

const expensesByMonth = months.reduce((acc:any, month) => {
    acc[month] = 0;
    return acc;
}, {});

incomes.forEach(income => {
    const monthName = convertDateToMonthName(income.date);
    incomesByMonth[monthName] += parseFloat(income.value);
});

expenses.forEach(expense => {
    const monthName = convertDateToMonthName(expense.date);
    expensesByMonth[monthName] += parseFloat(expense.value);
});

const incomesGraphValue = months.map(month => incomesByMonth[month]);
const expensesGraphValue = months.map(month => expensesByMonth[month]);

  return {
    recentHistoric,
    totalExpense,
    totalSalary,
    balance,
    incomes,
    expenses,
    monthNames: months,
    incomesGraphValue,
    expensesGraphValue,
    months,
  }
}