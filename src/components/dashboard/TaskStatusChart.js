'use client';

import styled from 'styled-components';
import { colors, fonts } from '@/styles/dashboardTheme';

const Card = styled.div`
  background: ${colors.cardBg};
  border-radius: 8px;
  padding: 16px;
  width: 321px;
  min-width: 321px;
  min-height: 389px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0 0 16px;
  font-family: ${fonts.inter};
  font-size: 15px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const ChartArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${fonts.inter};
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const LegendDot = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: ${(p) => p.$color};
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 8px;
  border-top: 1px solid transparent;
`;

const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

const StatValue = styled.div`
  font-family: ${fonts.inter};
  font-size: 20px;
  font-weight: 700;
  color: ${colors.textPrimary};
  line-height: 1.2;
`;

const StatLabel = styled.div`
  font-family: ${fonts.inter};
  font-size: 11.5px;
  color: ${colors.textSecondary};
  margin-top: 4px;
`;

const segments = [
  { color: '#f59e0b', label: 'To Do', percent: 33 },
  { color: '#3b82f6', label: 'In Progress', percent: 33 },
  { color: '#10b981', label: 'Done', percent: 33 },
];

export default function TaskStatusChart() {
  const r = 70;
  const cx = 120;
  const cy = 100;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  const rings = segments.map((seg) => {
    const length = (seg.percent / 100) * circumference;
    const ring = { ...seg, length, offset };
    offset += length;
    return ring;
  });

  const labelPositions = [
    { x: 55, y: 45, text: '33%', color: '#f59e0b' },
    { x: 175, y: 55, text: '33%', color: '#3b82f6' },
    { x: 120, y: 175, text: '33%', color: '#10b981' },
  ];

  return (
    <Card>
      <Title>Task Status Overview</Title>
      <ChartArea>
        <svg width="240" height="200" viewBox="0 0 240 200" aria-label="Task status donut chart">
          {rings.map((seg) => (
            <circle
              key={seg.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="28"
              strokeDasharray={`${seg.length} ${circumference - seg.length}`}
              strokeDashoffset={-seg.offset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}
          <circle cx={cx} cy={cy} r={42} fill={colors.cardBg} />
          {labelPositions.map((lp) => (
            <text
              key={lp.color}
              x={lp.x}
              y={lp.y}
              fill={lp.color}
              fontFamily="Inter, sans-serif"
              fontSize="11"
              fontWeight="500"
            >
              {lp.text}
            </text>
          ))}
        </svg>
        <Legend>
          {segments.map((seg) => (
            <LegendItem key={seg.label} $color={seg.color}>
              <LegendDot $color={seg.color} />
              {seg.label}
            </LegendItem>
          ))}
        </Legend>
      </ChartArea>
      <Stats>
        <Stat>
          <StatValue>2</StatValue>
          <StatLabel>To Do</StatLabel>
        </Stat>
        <Stat>
          <StatValue>2</StatValue>
          <StatLabel>In Progress</StatLabel>
        </Stat>
        <Stat>
          <StatValue>2</StatValue>
          <StatLabel>Done</StatLabel>
        </Stat>
      </Stats>
    </Card>
  );
}
