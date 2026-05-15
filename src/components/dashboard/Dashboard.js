'use client';

import {
  Bell,
  ChevronLeft,
  ChevronDown,
  HelpCircle,
  Plus,
  Search,
} from 'lucide-react';
import styled from 'styled-components';
import DashboardSidebar from './DashboardSidebar';
import ProjectCard from './ProjectCard';
import UpcomingTasksCard from './UpcomingTasksCard';
import TaskDoneChart from './TaskDoneChart';
import TaskStatusChart from './TaskStatusChart';
import { colors, fonts, projects } from '@/styles/dashboardTheme';

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${colors.pageBg};
  font-family: ${fonts.inter};
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const TopBar = styled.header`
  height: 59px;
  background: ${colors.headerBg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
`;

const Greeting = styled.h1`
  margin: 0;
  font-family: ${fonts.dmSans};
  font-size: 24px;
  font-weight: 700;
  color: ${colors.textWhite};
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.57);
  padding: 4px;
  display: flex;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
`;

const Avatar = styled.div`
  width: 27px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
`;

const OnlineDot = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${colors.online};
  box-shadow: 0 0 0 2px ${colors.headerBg};
`;

const Content = styled.main`
  flex: 1;
  padding: 24px 22px 32px;
  overflow-x: auto;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: #d9d9d9;
  padding: 0;
  display: flex;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const PageTitle = styled.h2`
  margin: 0;
  font-family: ${fonts.inter};
  font-size: 20px;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  position: relative;
  width: 232px;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: ${colors.searchIcon};
    pointer-events: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 41px;
  padding: 9px 16px 9px 40px;
  border-radius: 8px;
  border: 1px solid ${colors.inputBorder};
  background: ${colors.inputBg};
  font-family: ${fonts.inter};
  font-size: 13px;
  color: ${colors.textWhite};
  outline: none;

  &::placeholder {
    color: ${colors.textSecondary};
  }
`;

const NewProjectBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 41px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: ${colors.accent};
  color: ${colors.textWhite};
  font-family: ${fonts.inter};
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;

  svg {
    width: 19px;
    height: 19px;
  }
`;

const WeekFilter = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: ${fonts.poppins};
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;

  svg {
    width: 11px;
    height: 5px;
    color: rgba(255, 255, 255, 0.81);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 322px));
  gap: 24px 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartsRow = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export default function Dashboard() {
  const [website, mobile, marketing, userResearch, contentStrategy] = projects;

  return (
    <Page>
      <DashboardSidebar />
      <Main>
        <TopBar>
          <Greeting>Hi , Mostafa</Greeting>
          <TopActions>
            <IconBtn type="button" aria-label="Notifications">
              <Bell />
            </IconBtn>
            <IconBtn type="button" aria-label="Help">
              <HelpCircle />
            </IconBtn>
            <IconBtn type="button" aria-label="Search">
              <Search />
            </IconBtn>
            <AvatarWrap>
              <Avatar />
              <OnlineDot />
            </AvatarWrap>
          </TopActions>
        </TopBar>

        <Content>
          <Toolbar>
            <ToolbarLeft>
              <BackBtn type="button" aria-label="Go back">
                <ChevronLeft />
              </BackBtn>
              <PageTitle>Dashboard</PageTitle>
            </ToolbarLeft>
            <ToolbarRight>
              <SearchBox>
                <Search />
                <SearchInput type="search" placeholder="Search..." />
              </SearchBox>
              <NewProjectBtn type="button">
                <Plus />
                New Project
              </NewProjectBtn>
              <WeekFilter type="button">
                This week
                <ChevronDown size={14} />
              </WeekFilter>
            </ToolbarRight>
          </Toolbar>

          <ProjectGrid>
            <ProjectCard project={website} />
            <ProjectCard project={mobile} />
            <ProjectCard project={marketing} />
            <ProjectCard project={userResearch} />
            <ProjectCard project={contentStrategy} />
            <UpcomingTasksCard />
          </ProjectGrid>

          <ChartsRow>
            <TaskDoneChart />
            <TaskStatusChart />
          </ChartsRow>
        </Content>
      </Main>
    </Page>
  );
}
