export function formatData(date: string | number | Date) {
    if (typeof date === 'string') {
        const [year, month, day] = date.split('-').map(Number);
        date = new Date(year, month - 1, day);
    } else {
        date = new Date(date);
    }

    if (isNaN(date.getTime())) {
        throw new Error("Data inválida");
    }

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
