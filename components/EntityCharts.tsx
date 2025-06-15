import React from "react";
import { Card } from 'react-bootstrap';
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    PieChart,
    Pie,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Cell,
} from 'recharts';
import type {EntityChartsProps} from "../utils/types.ts";



const EntityCharts: React.FC<EntityChartsProps> = ({
                                                       chartData,
                                                       colorMap,
                                                       selectedType,
                                                       setSelectedType,
                                                   }) => {
    return (
        <Card className="mb-5 shadow-sm">
            <Card.Header>Entity Type Frequency</Card.Header>
            <Card.Body className="row d-flex align-items-center justify-content-center">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ right: 30, left: 120 }}
                        width={400}
                        height={400}
                    >
                        <Tooltip />
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="type"
                            width={80}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                        />
                        <Bar dataKey="value" label={{ position: 'right' }}>
                            {chartData.map((entry, idx) => (
                                <Cell
                                    key={`bar-${idx}`}
                                    cursor="pointer"
                                    fill={colorMap[entry.type] || '#8884d8'}
                                    fillOpacity={entry.type === selectedType ? 1 : 0.4}
                                    onClick={() =>
                                        setSelectedType(
                                            entry.type === selectedType ? null : entry.type
                                        )
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            nameKey="type"
                            isAnimationActive={false}
                            label
                        >
                            {chartData.map((entry, idx) => (
                                <Cell
                                    key={`pie-${idx}`}
                                    cursor="pointer"
                                    fill={colorMap[entry.type] || '#8884d8'}
                                    fillOpacity={entry.type === selectedType ? 1 : 0.4}
                                    onClick={() =>
                                        setSelectedType(
                                            entry.type === selectedType ? null : entry.type
                                        )
                                    }
                                />
                            ))}
                        </Pie>
                    </PieChart>
                    <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={chartData}
                        margin={{ left: 170, right: 120 }}
                        width={530}
                        height={400}
                    >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="type" />
                        <PolarRadiusAxis />
                        <Radar
                            dataKey="value"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
            </Card.Body>
        </Card>
    );
};

export default EntityCharts;
