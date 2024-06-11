import ApexCharts from "apexcharts";
import { SalaryBalance } from "./salaryBalance";

export function GraphData() {
    const {incomesGraphValue, expensesGraphValue, monthNames} = SalaryBalance();

    const options: ApexCharts.ApexOptions | undefined = {
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
            horizontal: true
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

    return {
        options, series
    }
}