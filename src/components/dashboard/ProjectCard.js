'use client';

import { Users } from 'lucide-react';
import styled from 'styled-components';
import { colors, fonts } from '@/styles/dashboardTheme';

const Card = styled.article`
  background: ${colors.cardBg};
  border: 1px solid ${colors.cardBorder};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-height: ${(p) => (p.$tall ? '218px' : '198px')};
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const IconBox = styled.div`
  width: 31px;
  height: 31px;
  border-radius: 4px;
  background: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.inter};
  font-size: 13px;
  font-weight: 500;
  color: ${colors.textWhite};
`;

const StatusBadge = styled.span`
  padding: 2px 10px;
  border-radius: 9999px;
  font-family: ${fonts.inter};
  font-size: 10px;
  font-weight: 500;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-family: ${fonts.inter};
  font-size: 15px;
  font-weight: 600;
  color: ${colors.textPrimary};
  line-height: 1.4;
`;

const Description = styled.p`
  margin: 0 0 16px;
  font-family: ${fonts.inter};
  font-size: 11.5px;
  color: ${colors.textSecondary};
  line-height: 1.68;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 9999px;
  background: ${colors.inputBg};
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 9999px;
  background: ${(p) => p.$color};
  width: ${(p) => p.$value}%;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${fonts.inter};
  font-size: 11.5px;
  color: ${colors.textSecondary};

  svg {
    width: 15px;
    height: 15px;
    opacity: 0.7;
  }
`;

export default function ProjectCard({ project }) {
  return (
    <Card $tall={project.tall}>
      <CardHeader>
        <IconBox $color={project.iconColor}>{project.initial}</IconBox>
        <StatusBadge $bg={project.statusBg} $color={project.statusColor}>
          {project.status}
        </StatusBadge>
      </CardHeader>
      <Title>{project.title}</Title>
      <Description>{project.description}</Description>
      <ProgressTrack>
        <ProgressFill $color={project.progressColor} $value={project.progress} />
      </ProgressTrack>
      <CardFooter>
        <Meta>
          <Users />
          <span>{project.members} members</span>
        </Meta>
        <Meta>
          <span>{project.progress}% complete</span>
        </Meta>
      </CardFooter>
    </Card>
  );
}
