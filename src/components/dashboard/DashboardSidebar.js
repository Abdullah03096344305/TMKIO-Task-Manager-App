'use client';

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Files,
  Clock,
  LogOut,
} from 'lucide-react';
import styled from 'styled-components';
import { colors, fonts, navItems } from '@/styles/dashboardTheme';

const Sidebar = styled.aside`
  width: 222px;
  min-width: 222px;
  min-height: 100vh;
  background: ${colors.sidebar};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const LogoSection = styled.div`
  padding: 21px 21px 0;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const LogoIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 3.5px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-family: ${fonts.inter};
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textWhite};
`;

const Divider = styled.div`
  height: 1px;
  background: #6366f1;
  margin: 0 0 12px;
`;

const Nav = styled.nav`
  flex: 1;
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-family: ${fonts.inter};
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  transition: background 0.2s;

  background: ${(p) =>
    p.$active ? colors.sidebarActive : p.$highlight ? colors.sidebarHighlight : 'transparent'};
  color: ${(p) => (p.$active || p.$highlight ? colors.textWhite : colors.textMuted)};

  &:hover {
    background: ${(p) =>
      p.$active ? colors.sidebarActive : 'rgba(255,255,255,0.08)'};
  }

  svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }
`;

const UpdatesLabel = styled.span`
  font-family: ${fonts.abhaya};
  font-size: 14px;
  font-weight: 700;
`;

const BottomSection = styled.div`
  padding: 0 14px 16px;
  margin-top: auto;
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 32px;
  margin-bottom: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: ${fonts.poppins};
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.63);

  svg {
    width: 18px;
    height: 18px;
    color: ${colors.textWhite};
  }
`;

const ProfileDivider = styled.div`
  height: 1px;
  background: #6366f1;
  margin-bottom: 14px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 14px 14px;
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #818cf8, #c084fc);
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  font-family: ${fonts.inter};
  font-size: 10px;
  font-weight: 500;
  color: ${colors.textWhite};
  line-height: 1.4;
`;

const ProfileRole = styled.span`
  font-family: ${fonts.inter};
  font-size: 10px;
  color: ${colors.admin};
`;

const iconMap = {
  dashboard: LayoutDashboard,
  projects: FolderKanban,
  team: Users,
  settings: Settings,
  files: Files,
  clock: Clock,
};

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <LogoSection>
        <LogoRow>
          <LogoIcon>
            <LayoutDashboard size={16} color="#fff" strokeWidth={2} />
          </LogoIcon>
          <LogoText>TaskFlow</LogoText>
        </LogoRow>
        <Divider />
      </LogoSection>

      <Nav>
        {navItems.map((item) => {
          const Icon = iconMap[item.id === 'updates' ? 'clock' : item.id];
          return (
            <NavItem
              key={item.id}
              type="button"
              $active={item.active}
              $highlight={item.highlight}
            >
              <Icon />
              {item.icon === 'clock' ? (
                <UpdatesLabel>{item.label}</UpdatesLabel>
              ) : (
                item.label
              )}
            </NavItem>
          );
        })}
      </Nav>

      <BottomSection>
        <LogoutBtn type="button">
          <LogOut />
          Log out
        </LogoutBtn>
        <ProfileDivider />
      </BottomSection>

      <Profile>
        <Avatar />
        <ProfileInfo>
          <ProfileName>Mostafa Mahmoud</ProfileName>
          <ProfileRole>Admin</ProfileRole>
        </ProfileInfo>
      </Profile>
    </Sidebar>
  );
}
