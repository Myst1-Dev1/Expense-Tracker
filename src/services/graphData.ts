import ApexCharts from "apexcharts";
import { SalaryBalance } from "./salaryBalance";

export function GraphData() {
    const { incomesGraphValue, expensesGraphValue, monthNames } = SalaryBalance();

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            },
        },
        xaxis: {
            categories: monthNames,
            labels: {
                style: {
                    colors: Array(12).fill('#fff'),
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
            shared: true,
            followCursor: false,
            intersect: false,
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
        colors: ['#84cc16', '#ef4444'],
    };

    const series = [
        {
            name: "Renda",
            data: incomesGraphValue,
        },
        {
            name: "Despesa",
            data: expensesGraphValue,
        }
    ];

    return {
        options,
        series
    };
}
