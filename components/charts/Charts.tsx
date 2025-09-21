import React from 'react';

const lineChartData = {
    labels: ['W1', 'W2', 'W3', 'W4'],
    data: [65, 59, 80, 81],
};

const barChartData = {
    labels: ['Insta', 'FB', 'Email', 'Other'],
    data: [12, 19, 3, 5],
};

const ChartContainer: React.FC<{ children: React.ReactNode, viewBox: string }> = ({ children, viewBox }) => (
    <svg viewBox={viewBox} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {children}
    </svg>
);

export const LineChart: React.FC = () => {
    const data = lineChartData.data;
    const labels = lineChartData.labels;
    const maxVal = Math.max(...data);
    const points = data.map((val, i) => `${i * 33},${100 - (val / maxVal * 90)}`).join(' ');

    return (
        <ChartContainer viewBox="0 0 100 100">
            {/* Y-axis lines */}
            {[0.25, 0.5, 0.75, 1].map(v => (
                 <line key={v} x1="0" y1={100 - (v * 90)} x2="100" y2={100 - (v * 90)} className="stroke-border-color" strokeWidth="0.5" strokeDasharray="2" />
            ))}
            
            {/* Data line */}
            <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
            
            {/* Data points */}
            {data.map((val, i) => (
                <circle key={i} cx={i * 33} cy={100 - (val / maxVal * 90)} r="2" fill="currentColor" />
            ))}

            {/* X-axis labels */}
            {labels.map((label, i) => (
                <text key={label} x={i * 33} y="100" fontSize="8" className="fill-text-secondary" textAnchor="middle">{label}</text>
            ))}
        </ChartContainer>
    );
};

export const BarChart: React.FC = () => {
    const data = barChartData.data;
    const labels = barChartData.labels;
    const maxVal = Math.max(...data);
    const barWidth = 15;
    const spacing = 25;

    return (
        <ChartContainer viewBox="0 0 100 100">
             {/* Y-axis lines */}
            {[0.25, 0.5, 0.75, 1].map(v => (
                 <line key={v} x1="0" y1={90 - (v * 90)} x2="100" y2={90 - (v * 90)} className="stroke-border-color" strokeWidth="0.5" strokeDasharray="2" />
            ))}

            {/* Bars */}
            {data.map((val, i) => (
                <rect 
                    key={i} 
                    x={i * spacing + 5} 
                    y={90 - (val / maxVal * 90)}
                    width={barWidth}
                    height={val / maxVal * 90}
                    fill="currentColor"
                    className="opacity-70"
                />
            ))}

             {/* X-axis labels */}
            {labels.map((label, i) => (
                <text key={label} x={i * spacing + 5 + barWidth / 2} y="100" fontSize="8" className="fill-text-secondary" textAnchor="middle" >{label}</text>
            ))}
        </ChartContainer>
    );
};