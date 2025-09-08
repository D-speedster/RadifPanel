import { ReactNode } from 'react'
import { Card } from '@/components/ui'

type KeyMetricsCardProps = {
    title: string
    value: string
    description: string
    change: string
    icon: ReactNode
    iconBgColor: string
    iconColor: string
}

const KeyMetricsCard = ({
    title,
    value,
    description,
    change,
    icon,
    iconBgColor,
    iconColor
}: KeyMetricsCardProps) => {
    return (
        <Card 
            className="bg-white flex-shrink-0" 
            style={{
                padding: '1.75rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
                border: 'none',
                transition: 'all 0.2s ease'
            }}
        >
            <div className="flex items-start justify-between mb-4">
                <div 
                    className="flex items-center justify-center"
                    style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '1rem',
                        backgroundColor: iconBgColor
                    }}
                >
                    <div style={{ color: iconColor }}>
                        {icon}
                    </div>
                </div>
                <div 
                    className="text-xs font-semibold px-2 py-1"
                    style={{
                        backgroundColor: change.startsWith('+') ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                        color: change.startsWith('+') ? '#059669' : '#DC2626',
                        borderRadius: '0.5rem'
                    }}
                >
                    {change}
                </div>
            </div>
            <div>
                <p 
                    className="font-bold mb-1" 
                    style={{ 
                        fontSize: '2.25rem',
                        color: '#1A202C',
                        lineHeight: '1.1',
                        letterSpacing: '-0.025em'
                    }}
                >
                    {value}
                </p>
                <p 
                    className="font-medium mb-1" 
                    style={{ 
                        color: '#1A202C', 
                        fontSize: '1.1rem',
                        fontWeight: '500'
                    }}
                >
                    {title}
                </p>
                <p 
                    style={{ 
                        color: '#A0AEC0', 
                        fontSize: '0.8rem',
                        fontWeight: '400'
                    }}
                >
                    {description}
                </p>
            </div>
        </Card>
    )
}

export default KeyMetricsCard