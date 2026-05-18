'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '@/styles/dashboardTheme';

const Card = styled.div`
  background: ${colors.cardBg};
  border-radius: 16px;
  padding: 25px 24px 20px;
  flex: 1;
  min-width: 0;
  min-height: 388px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${fonts.dmSans};
  font-size: 24px;
  font-weight: 700;
  color: #c3c3c3;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Tab = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: ${fonts.dmSans};
  font-size: 18px;
  font-weight: 500;
  color: ${(p) => (p.$active ? colors.chartBlue : colors.tabInactive)};
  padding: 0 0 8px;
  position: relative;

  &::after {
    content: '';
    display: ${(p) => (p.$active ? 'block' : 'none')};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: ${colors.chartBlue};
    border-radius: 1px;
  }
`;

const ChartWrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const months = [
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
];

const lineA =
  'M25,194 L110,171 L191,49 L272,77 L352,96 L432,96 L515,126 L590,38 L672,62 L731,133 L738,155';
const lineB =
  'M24,172 L109,157 L223,9 L272,76 L352,129 L432,96 L516,193 L599,186 L738,155';

const areaA = `${lineA} L738,230 L25,230 Z`;
const areaB = `${lineB} L738,230 L24,230 Z`;

export default function TaskDoneChart() {
  const [period, setPeriod] = useState('monthly');

  return (
    <Card>
      <Header>
        <Title>Task Done</Title>
        <Tabs>
          {['daily', 'weekly', 'monthly'].map((tab) => (
            <Tab
              key={tab}
              type="button"
              $active={period === tab}
              onClick={() => setPeriod(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Tab>
          ))}
        </Tabs>
      </Header>
      <ChartWrap>
        <svg
          viewBox="0 0 820 260"
          width="100%"
          height="260"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Task done chart"
        >
          {[0, 57.5, 115, 172.5, 230].map((y) => (
            <line
              key={y}
              x1="50"
              y1={y}
              x2="800"
              y2={y}
              stroke={colors.chartGrid}
              strokeWidth="1"
            />
          ))}
          {['400', '300', '200', '100', '0'].map((label, i) => (
            <text
              key={label}
              x="0"
              y={i * 57.5 + 4}
              fill={colors.chartAxis}
              fontFamily="DM Sans, sans-serif"
              fontSize="12"
            >
              {label}
            </text>
          ))}
          <path d={areaB} fill="rgba(80,81,249,0.25)" />
          <path d={areaA} fill="rgba(30,167,255,0.2)" />
          <path
            d={lineB}
            fill="none"
            stroke={colors.chartPurple}
            strokeWidth="2.5"
          />
          <path
            d={lineA}
            fill="none"
            stroke={colors.chartBlue}
            strokeWidth="2.5"
          />
          {[
            [25, 194],
            [110, 171],
            [191, 49],
            [272, 77],
            [352, 96],
            [432, 96],
            [515, 126],
            [590, 38],
            [672, 62],
            [731, 133],
            [738, 155],
          ].map(([cx, cy], i) => (
            <circle
              key={`a-${i}`}
              cx={cx}
              cy={cy}
              r="5.5"
              fill={colors.chartBlue}
              stroke={colors.cardBg}
              strokeWidth="2"
            />
          ))}
          {[
            [24, 172],
            [109, 157],
            [223, 9],
            [272, 76],
            [352, 129],
            [432, 96],
            [516, 193],
            [599, 186],
            [738, 155],
          ].map(([cx, cy], i) => (
            <circle
              key={`b-${i}`}
              cx={cx}
              cy={cy}
              r="5.5"
              fill={colors.chartPurple}
              stroke={colors.cardBg}
              strokeWidth="2"
            />
          ))}
          {months.map((month, i) => (
            <text
              key={month}
              x={50 + i * 66}
              y={252}
              fill={colors.chartMonth}
              fontFamily="DM Sans, sans-serif"
              fontSize="12"
              textAnchor="middle"
            >
              {month}
            </text>
          ))}
        </svg>
      </ChartWrap>
    </Card>
  );
}
