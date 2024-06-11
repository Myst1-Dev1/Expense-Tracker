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

    const incomesGraphValue = incomes.map(income => income.value);
    const expensesGraphValue = expenses.map(expense => expense.value);

    const dateIncomes = incomes.map(income => income.date);
    const dateExpenses = expenses.map(expense => expense.date);

    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ];
      
      const convertDateToMonthName = (dateString: string | any) => {
        const date = new Date(dateString);
        const monthIndex = date.getMonth();
        return months[monthIndex];
      };
      
      const convertedMonthsIncome = dateIncomes.map(convertDateToMonthName);
      const convertedMonthsExpense = dateExpenses.map(convertDateToMonthName);
      
      const allMonths = [...convertedMonthsIncome, ...convertedMonthsExpense];
      const totalMonths = new Set(allMonths);
      
      const monthNames = Array.from(totalMonths).sort((a, b) => {
        const months = [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ];
      
        return months.indexOf(a) - months.indexOf(b);
      });

  return {
    recentHistoric,
    totalExpense,
    totalSalary,
    balance,
    incomes,
    expenses,
    monthNames,
    incomesGraphValue,
    expensesGraphValue,
    totalMonths,
    months,
  }
}