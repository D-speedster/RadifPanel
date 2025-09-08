import { useState } from 'react'
import { Card } from '@/components/ui'
import Select from '@/components/ui/Select'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

type SalesChartProps = {
    className?: string
}

const SalesChart = ({ className }: SalesChartProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState('6months')

    const periodOptions = [
        { value: '7days', label: '7 Days' },
        { value: '30days', label: '30 Days' },
        { value: '6months', label: '6 Months' },
        { value: '1year', label: '1 Year' }
    ]

    // داده‌های نمونه برای نمودار میله‌ای
    const chartData = {
        '7days': {
            series: [{
                name: 'Sleep Hours',
                data: [6.5, 7.2, 5.8, 8.1, 7.5, 6.9, 8.3]
            }],
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        '30days': {
            series: [{
                name: 'Sleep Hours',
                data: [6.2, 7.1, 6.8, 7.5, 6.9, 7.8, 8.1, 6.5, 7.2, 6.9, 7.4, 8.0, 6.7, 7.3, 6.8]
            }],
            categories: Array.from({length: 15}, (_, i) => `${i + 1}`)
        },
        '6months': {
            series: [{
                name: 'Sleep Hours',
                data: [6.8, 7.2, 6.5, 7.8, 8.1, 7.5, 6.9, 7.4, 8.2, 7.1, 6.7, 7.9]
            }],
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        '1year': {
            series: [{
                name: 'Sleep Hours',
                data: [6.9, 7.1, 6.8, 7.3, 7.6, 7.2, 6.7, 7.4, 7.8, 7.0, 6.9, 7.5]
            }],
            categories: ['2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4']
        }
    }

    const currentData = chartData[selectedPeriod as keyof typeof chartData]

    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            },
            fontFamily: '"Inter", sans-serif'
        },
        colors: ['#7A52F4'],
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '60%',
                distributed: false
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false
        },
        xaxis: {
            categories: currentData.categories,
            labels: {
                style: {
                    colors: '#A0AEC0',
                    fontSize: '12px',
                    fontWeight: '400'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        tooltip: {
            theme: 'light',
            style: {
                fontSize: '12px',
                fontFamily: 'inherit'
            },
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const value = series[seriesIndex][dataPointIndex]
                const category = w.globals.labels[dataPointIndex]
                return `
                    <div style="
                        background: white;
                        padding: 12px 16px;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                        border: 1px solid #E5E7EB;
                        font-family: inherit;
                    ">
                        <div style="color: #A0AEC0; font-size: 11px; margin-bottom: 4px;">${category}</div>
                        <div style="color: #1A202C; font-weight: 600; font-size: 14px;">
                            ${value} Hours
                        </div>
                    </div>
                `
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                gradientToColors: ['#A78BFA'],
                inverseColors: false,
                opacityFrom: 0.9,
                opacityTo: 0.4,
                stops: [0, 100]
            }
        }
    }

    return (
        <Card 
            className={`bg-white ${className || ''}`}
            style={{
                padding: '1.75rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
                border: 'none'
            }}
        >
            <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
                <h3 
                    className="font-bold" 
                    style={{ 
                        color: '#1A202C',
                        fontSize: '1.25rem',
                        fontWeight: '600'
                    }}
                >
                    گزارشات ماهانه
                </h3>
                <Select
                    size="sm"
                    value={periodOptions.find(option => option.value === selectedPeriod)}
                    options={periodOptions}
                    onChange={(option) => setSelectedPeriod(option?.value || '6months')}
                    className="min-w-[120px]"
                    style={{
                        borderRadius: '0.5rem',
                        border: '1px solid #E2E8F0',
                        fontSize: '0.875rem'
                    }}
                />
            </div>
            <div className="h-80">
                <Chart
                    options={chartOptions}
                    series={currentData.series}
                    type="bar"
                    height={320}
                />
            </div>
        </Card>
    )
}

export default SalesChart