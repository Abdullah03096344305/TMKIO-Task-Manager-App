'use client';

import { SlidersHorizontal } from 'lucide-react';
import styled from 'styled-components';
import { colors, fonts } from '@/styles/dashboardTheme';

const Card = styled.div`
  background: ${colors.cardBg};
  border-radius: 8px;
  padding: 16px;
  min-height: 232px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${fonts.inter};
  font-size: 15px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const FilterBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${colors.textSecondary};
  padding: 0;
  display: flex;

  svg {
    width: 19px;
    height: 19px;
  }
`;

const EmptyState = styled.p`
  margin: auto;
  text-align: center;
  font-family: ${fonts.inter};
  font-size: 13px;
  color: ${colors.textWhite};
  line-height: 1.76;
  padding: 28px 16px;
`;

export default function UpcomingTasksCard() {
  return (
    <Card>
      <Header>
        <Title>Upcoming Tasks</Title>
        <FilterBtn type="button" aria-label="Filter upcoming tasks">
          <SlidersHorizontal />
        </FilterBtn>
      </Header>
      <EmptyState>No upcoming tasks for the next 7 days</EmptyState>
    </Card>
  );
}
