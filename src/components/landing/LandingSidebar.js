'use client';

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Files,
  Clock,
  LogOut,
  Plus,
  ChevronDown,
} from 'lucide-react';
import styled from 'styled-components';
import { colors, fonts } from '@/styles/landingTheme';

const Sidebar = styled.aside`
  width: 249px;
  min-width: 249px;
  min-height: 100vh;
  background: ${colors.sidebarGradient};
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
  font-size: 14.7px;
  font-weight: 700;
  color: ${colors.textWhite};
`;

const Divider = styled.div`
  height: 1px;
  background: #6366f1;
  margin-bottom: 12px;
`;

const Nav = styled.nav`
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
  font-size: 11.8px;
  font-weight: 400;
  text-align: left;
  background: ${(p) =>
    p.$active ? colors.sidebarActive : p.$highlight ? colors.sidebarFiles : 'transparent'};
  color: ${(p) => (p.$active || p.$highlight ? colors.textWhite : colors.textMuted)};

  svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }
`;

const TeamRow = styled(NavItem)`
  justify-content: space-between;
  padding-right: 8px;
`;

const TeamAvatar = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: -12px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(p) => (p.$plus ? '14px' : '12px')};
  color: #fff;
  font-weight: 500;

  &:first-child {
    margin-left: 0;
  }
`;

const TeamToggle = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const WorkspaceSection = styled.div`
  padding: 0 17px;
  margin-top: 4px;
  flex: 1;
`;

const WorkspaceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const WorkspaceTitle = styled.span`
  font-family: ${fonts.switzer};
  font-size: 19.7px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.68);
`;

const CollapseBtn = styled.button`
  width: 23px;
  height: 29px;
  border: none;
  border-radius: 48px;
  background: rgba(0, 0, 0, 0.04);
  color: rgba(255, 255, 255, 0.68);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WorkspaceActive = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 48px 12px 8px;
  border-radius: 12px;
  background: ${colors.workspaceGradient};
  margin-bottom: 4px;
  cursor: pointer;

  span {
    font-family: ${fonts.switzer};
    font-size: 19.7px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.72);
  }
`;

const PlaceholderBar = styled.div`
  height: 13px;
  border-radius: 46px;
  background: #eeebe3;
  width: ${(p) => p.$width || '141px'};
  margin: 0 0 12px 32px;
`;

const TreeWrap = styled.div`
  position: relative;
  height: 108px;
  margin: 4px 0 8px 13px;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 12px;
    bottom: 20px;
    width: 1px;
    background: #a7a7a7;
  }
`;

const TreeItem = styled.div`
  position: absolute;
  left: 26px;
  width: 75px;
  height: 12px;
  border-radius: 46px;
  background: #eeebe3;

  &:nth-child(1) {
    top: 54px;
  }
  &:nth-child(2) {
    top: 88px;
  }
`;

const TreeCorner = styled.div`
  position: absolute;
  left: 10px;
  width: 22px;
  height: 18px;
  border-left: 1px solid #a7a7a7;
  border-bottom: 1px solid #a7a7a7;

  &:nth-of-type(1) {
    top: 12px;
  }
  &:nth-of-type(2) {
    top: 46px;
  }
  &:nth-of-type(3) {
    top: 80px;
  }
`;

const AddNew = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px 0 4px 26px;
  margin: 8px 0 20px;
  color: #e2eeff;
  font-family: ${fonts.switzer};
  font-size: 15.8px;
  font-weight: 400;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const WorkspaceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px;
  cursor: pointer;

  span {
    font-family: ${fonts.switzer};
    font-size: 19.7px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.68);
  }
`;

const BottomSection = styled.div`
  margin-top: auto;
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 46px;
  margin-bottom: 0;
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
  margin: 0;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 15px 28px 15px 28px;
  border-top: 1px solid #6366f1;
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa, #6366f1);
`;

const ProfileName = styled.span`
  font-family: ${fonts.inter};
  font-size: 10.4px;
  font-weight: 500;
  color: ${colors.textWhite};
  display: block;
  line-height: 1.4;
`;

const ProfileRole = styled.span`
  font-family: ${fonts.inter};
  font-size: 10.3px;
  color: #c7d2fe;
`;

const UpdatesLabel = styled.span`
  font-family: ${fonts.abhaya};
  font-size: 13.8px;
  font-weight: 700;
`;

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'team', label: 'Team', icon: Users, teamToggle: true },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'files', label: 'Files', icon: Files, highlight: true },
  { id: 'updates', label: 'All Updates', icon: Clock, special: true },
];

export default function LandingSidebar() {
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
          const Icon = item.icon;
          if (item.teamToggle) {
            return (
              <TeamRow key={item.id} type="button" $active={false}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <Icon />
                  {item.label}
                </span>
                <TeamToggle>
                  <TeamAvatar $bg="linear-gradient(135deg, #c4b5fd, #818cf8)" />
                  <TeamAvatar $bg="linear-gradient(135deg, #f9a8d4, #fb7185)" />
                  <TeamAvatar $bg="#000" $plus>
                    +
                  </TeamAvatar>
                </TeamToggle>
              </TeamRow>
            );
          }
          return (
            <NavItem
              key={item.id}
              type="button"
              $active={item.active}
              $highlight={item.highlight}
            >
              <Icon />
              {item.special ? <UpdatesLabel>{item.label}</UpdatesLabel> : item.label}
            </NavItem>
          );
        })}
      </Nav>

      <WorkspaceSection>
        <WorkspaceHeader>
          <WorkspaceTitle>Workspace</WorkspaceTitle>
          <CollapseBtn type="button" aria-label="Collapse">
            <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
          </CollapseBtn>
        </WorkspaceHeader>

        <PlaceholderBar />
        <WorkspaceActive>
          <ChevronDown size={16} color="rgba(255,255,255,0.75)" />
          <span>Fintask Web ..</span>
        </WorkspaceActive>

        <TreeWrap>
          <TreeCorner />
          <TreeCorner />
          <TreeCorner />
          <TreeItem />
          <TreeItem />
        </TreeWrap>

        <AddNew type="button">
          <Plus size={16} strokeWidth={2} />
          Add New
        </AddNew>

        <WorkspaceItem>
          <ChevronDown size={16} color="rgba(255,255,255,0.68)" />
          <span>Habite Tracker</span>
        </WorkspaceItem>
        <PlaceholderBar $width="141px" />
      </WorkspaceSection>

      <BottomSection>
        <LogoutBtn type="button">
          <LogOut />
          Log out
        </LogoutBtn>
        <ProfileDivider />
        <Profile>
          <Avatar />
          <div>
            <ProfileName>Mostafa Mahmoud</ProfileName>
            <ProfileRole>Admin</ProfileRole>
          </div>
        </Profile>
      </BottomSection>
    </Sidebar>
  );
}
