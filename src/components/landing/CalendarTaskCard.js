'use client';

import { MoreHorizontal, Paperclip, MessageCircle } from 'lucide-react';
import styled from 'styled-components';
import { fonts, cards } from '@/styles/landingTheme';

const Card = styled.div`
  position: absolute;
  border-radius: 5.92px;
  border: 0.99px solid ${(p) => p.$border};
  background: ${(p) => p.$bg};
  box-sizing: border-box;
  left: ${(p) => p.$left}px;
  top: ${(p) => p.$top}px;
  width: ${(p) => p.$width}px;
  height: ${(p) => p.$height}px;
  z-index: ${(p) => (p.$large ? 2 : 1)};
  padding: ${(p) => (p.$large ? '24px' : p.$compact ? '12px 16px' : '20px')};
`;

const Label = styled.span`
  font-family: ${fonts.switzer};
  font-size: ${(p) => (p.$small ? '13.8px' : '15.8px')};
  font-weight: 400;
  color: rgba(0, 0, 0, 0.64);
  display: block;
  line-height: 1.2;
`;

const Title = styled.span`
  font-family: ${fonts.switzer};
  font-size: ${(p) => (p.$large ? '23.7px' : p.$small ? '19.7px' : '23.7px')};
  font-weight: 400;
  color: #000;
  display: block;
  margin-top: ${(p) => (p.$small ? '4px' : '8px')};
  line-height: 1.2;
`;

const Avatar = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: ${(p) => (p.$first ? '0' : '-12px')};
  background: ${(p) => p.$gradient};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.switzer};
  font-size: 11.8px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.88);
  flex-shrink: 0;
`;

const AvatarStack = styled.div`
  display: flex;
  align-items: center;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
  margin-right: auto;
`;

const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 3.95px;
  font-family: ${fonts.switzer};
  font-size: 13.8px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.86);
  background: ${(p) => p.$bg};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: rgba(0, 0, 0, 0.48);
  font-family: ${fonts.switzer};
  font-size: 13.8px;
  font-weight: 400;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const MenuBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: #000;
  padding: 0;
  margin-top: 4px;
`;

const avatarGradients = [
  'linear-gradient(135deg, #f0abfc, #c084fc)',
  'linear-gradient(135deg, #93c5fd, #60a5fa)',
];

function Avatars({ count = 3, style }) {
  const shown = Math.min(count, 2);
  const extra = count > 2 ? `${count}+` : null;

  return (
    <AvatarStack style={style}>
      {Array.from({ length: shown }).map((_, i) => (
        <Avatar key={i} $first={i === 0} $gradient={avatarGradients[i]} />
      ))}
      {extra && (
        <Avatar $first={false} $gradient="rgba(0,0,0,0.06)">
          {extra}
        </Avatar>
      )}
    </AvatarStack>
  );
}

function TaskCard({ config, compact, large, children, avatars }) {
  return (
    <Card
      $left={config.left}
      $top={config.top}
      $width={config.width}
      $height={config.height}
      $bg={config.bg}
      $border={config.border}
      $compact={compact}
      $large={large}
    >
      {children}
      {avatars}
    </Card>
  );
}

export function DevelopmentCard() {
  return (
    <TaskCard
      config={cards.development}
      avatars={<Avatars count={5} style={{ position: 'absolute', right: 20, top: 36 }} />}
    >
      <Label>Fintask</Label>
      <Title>Development</Title>
    </TaskCard>
  );
}

export function UxCopywriteCard() {
  return (
    <TaskCard
      config={cards.ux}
      avatars={<Avatars count={3} style={{ position: 'absolute', right: 20, top: 32 }} />}
    >
      <Label>Fintask</Label>
      <Title>UX Copywrite</Title>
    </TaskCard>
  );
}

export function BugFixCard() {
  return (
    <TaskCard
      config={cards.bug}
      compact
      avatars={<Avatars count={10} style={{ position: 'absolute', right: 16, top: 18 }} />}
    >
      <Label $small>Fintask</Label>
      <Title $small>Bug Fix</Title>
    </TaskCard>
  );
}

export function WebVisualDesignCard() {
  return (
    <TaskCard config={cards.design} large>
      <CardTop>
        <div>
          <Label>Fintask</Label>
          <Title $large>Web Visual Design</Title>
        </div>
        <MenuBtn type="button" aria-label="More">
          <MoreHorizontal size={22} strokeWidth={2} />
        </MenuBtn>
      </CardTop>
      <CardFooter>
        <Avatars count={2} />
        <Tags>
          <Tag $bg="rgba(151, 91, 236, 0.2)">Visual</Tag>
          <Tag $bg="rgba(255, 209, 90, 0.32)">P2 🏆</Tag>
        </Tags>
        <Meta>
          <span>
            <MessageCircle size={16} strokeWidth={1.5} />5
          </span>
          <span>
            <Paperclip size={16} strokeWidth={1.5} />3
          </span>
        </Meta>
      </CardFooter>
    </TaskCard>
  );
}
