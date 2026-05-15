'use client';

import {
  Bell,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  MoreHorizontal,
  Calendar,
  List,
  LayoutGrid,
} from 'lucide-react';
import styled from 'styled-components';
import LandingSidebar from './LandingSidebar';
import {
  DevelopmentCard,
  UxCopywriteCard,
  BugFixCard,
  WebVisualDesignCard,
} from './CalendarTaskCard';
import { colors, fonts, layout, gridLines, timePills, timeLabelY } from '@/styles/landingTheme';

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${colors.pageBg};
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: ${colors.pageBg};
`;

const HeaderWrap = styled.div`
  background: ${colors.headerBg};
  border-radius: ${layout.headerRadius}px ${layout.headerRadius}px 0 0;
  overflow: hidden;
  flex-shrink: 0;
`;

const TopBar = styled.header`
  height: ${layout.headerHeight}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  box-shadow: 0 1px 1.5px rgba(0, 0, 0, 0.05);
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
`;

const AvatarWrap = styled.div`
  position: relative;
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
  padding: 0 ${layout.contentPadding}px 40px;
  min-width: 900px;
`;

const TopSection = styled.div`
  position: relative;
  min-height: 200px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0 24px;
  font-family: ${fonts.switzer};
  font-size: 17.8px;
  font-weight: 500;
  color: ${colors.breadcrumb};
`;

const ArrowBtn = styled.button`
  border: none;
  background: ${(p) => (p.$muted ? 'transparent' : 'rgba(0,0,0,0.04)')};
  border-radius: 48px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(p) => (p.$muted ? 'rgba(255,249,249,0.42)' : colors.breadcrumb)};
  padding: 0;
`;

const NavArrows = styled.div`
  display: flex;
  gap: 4px;
  margin-right: 8px;
`;

const TitleBlock = styled.div`
  margin-bottom: 8px;
`;

const Category = styled.p`
  margin: 0 0 6px;
  font-family: ${fonts.switzer};
  font-size: 19.7px;
  font-weight: 400;
  color: ${colors.category};
`;

const PageTitle = styled.h2`
  margin: 0;
  font-family: ${fonts.switzer};
  font-size: 43.4px;
  font-weight: 400;
  color: ${colors.textWhite};
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const RightCol = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
`;

const InviteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  margin-bottom: 48px;
`;

const MemberAvatar = styled.span`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.19);
  margin-left: -12px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.switzer};
  font-size: ${(p) => (p.$count ? '16.8px' : 'inherit')};
  font-weight: 500;
  color: ${(p) => (p.$count ? 'rgba(255,255,255,0.84)' : 'transparent')};

  &:first-child {
    margin-left: 0;
  }
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

const DividerV = styled.div`
  width: 1px;
  height: 22px;
  background: rgba(227, 217, 217, 0.2);
  flex-shrink: 0;
`;

const InviteBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border: none;
  border-radius: 7.9px;
  background: ${colors.inviteGradient};
  cursor: pointer;
  font-family: ${fonts.switzer};
  font-size: 17.8px;
  font-weight: 500;
  color: ${colors.invite};

  .icon-wrap {
    width: 20px;
    height: 20px;
    border-radius: 48px;
    background: rgba(151, 91, 236, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MetaBlock = styled.div`
  display: flex;
  gap: 49px;
  justify-content: flex-end;
`;

const MetaItem = styled.div`
  text-align: left;
`;

const MetaValue = styled.div`
  font-family: ${fonts.switzer};
  font-size: 31.6px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.66);
  line-height: 1.1;
`;

const MetaLabel = styled.div`
  font-family: ${fonts.switzer};
  font-size: 17.8px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 4px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 0;
  flex-wrap: wrap;
  gap: 16px;
`;

const ViewTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const ViewTab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: ${fonts.switzer};
  font-size: ${(p) => (p.$active ? '23.7px' : 'inherit')};
  font-weight: 500;
  color: ${(p) => (p.$active ? colors.tabActiveText : colors.tabInactive)};
  padding: 0;
  height: 32px;
`;

const TabPlaceholder = styled.span`
  display: inline-block;
  width: ${(p) => p.$width}px;
  height: 13px;
  border-radius: 46px;
  background: ${colors.tabPlaceholder};
  margin-left: 8px;
`;

const IconTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const IconTab = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  color: rgba(255, 255, 255, 0.51);
`;

const TabUnderlineWrap = styled.div`
  position: relative;
  height: 3px;
  margin: 12px 0 20px;
`;

const TabUnderline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2.5px;
  background: ${colors.tabUnderline};
  border-radius: 1px;
`;

const TabUnderlineActive = styled.div`
  position: absolute;
  top: 0;
  left: 511px;
  width: 226px;
  height: 2.5px;
  background: ${colors.tabActiveBlue};
  border-radius: 1px;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DateNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateTitle = styled.h3`
  margin: 0;
  font-family: ${fonts.switzer};
  font-size: 35.5px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`;

const DayToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${colors.dayToggleBg};
  border-radius: 7.9px;
  padding: 8px;
  height: 48px;
`;

const DayOption = styled.button`
  border: none;
  border-radius: 3.95px;
  padding: 4px 12px;
  cursor: pointer;
  font-family: ${fonts.switzer};
  font-size: 17.8px;
  font-weight: 500;
  background: ${(p) => (p.$active ? '#fff' : '#e9e9e9')};
  color: ${(p) => (p.$active ? '#000' : 'transparent')};
  min-width: ${(p) => (p.$active ? 'auto' : '50px')};
  height: ${(p) => (p.$active ? 'auto' : '13px')};
`;

const Timeline = styled.div`
  position: relative;
  min-height: 620px;
  margin-left: 0;
  padding-left: ${layout.timelineLeft}px;
`;

const TimeLabel = styled.div`
  position: absolute;
  left: 0;
  top: ${timeLabelY}px;
  font-family: ${fonts.switzer};
  font-size: 19.7px;
  font-weight: 500;
  color: ${colors.timeLabel};
  width: 96px;
`;

const TimePill = styled.div`
  position: absolute;
  left: 0;
  top: ${(p) => p.$top}px;
  width: 109px;
  height: ${(p) => p.$height || 16}px;
  border-radius: 46px;
  background: ${(p) => p.$bg || colors.timePill};
`;

const GridLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: ${(p) => p.$top}px;
  height: 2.5px;
  background: ${(p) => (p.$strong ? colors.timelineLineStrong : colors.timelineLine)};
`;

const CurrentTimeLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: ${(p) => p.$top}px;
  height: 2.5px;
  background: ${colors.currentTimeGradient};
  z-index: 3;
`;

const avatarBgs = [
  'linear-gradient(135deg, #c4b5fd 0%, #818cf8 100%)',
  'linear-gradient(135deg, #f9a8d4 0%, #fb923c 100%)',
  'linear-gradient(135deg, #6ee7b7 0%, #38bdf8 100%)',
  'rgba(0, 0, 0, 0.08)',
];

export default function LandingPage() {
  return (
    <Page>
      <LandingSidebar />
      <Main>
        <HeaderWrap>
          <TopBar>
            <Greeting>Hi , Mostafa</Greeting>
            <TopActions>
              <IconBtn type="button" aria-label="Notifications">
                <Bell size={20} strokeWidth={1.5} />
              </IconBtn>
              <IconBtn type="button" aria-label="Help">
                <HelpCircle size={20} strokeWidth={1.5} />
              </IconBtn>
              <IconBtn type="button" aria-label="Search">
                <Search size={20} strokeWidth={1.5} />
              </IconBtn>
              <AvatarWrap>
                <Avatar />
                <OnlineDot />
              </AvatarWrap>
            </TopActions>
          </TopBar>
        </HeaderWrap>

        <Content>
          <TopSection>
            <Breadcrumb>
              <NavArrows>
                <ArrowBtn type="button" $muted aria-label="Back">
                  <ChevronLeft size={12} />
                </ArrowBtn>
                <ArrowBtn type="button" aria-label="Forward">
                  <ChevronRight size={12} />
                </ArrowBtn>
              </NavArrows>
              / Landing Page
            </Breadcrumb>

            <TitleBlock>
              <Category>🎒 Web Design</Category>
              <PageTitle>Fintask Landing Page</PageTitle>
            </TitleBlock>

            <RightCol>
              <InviteRow>
                <AvatarGroup>
                  <MemberAvatar $bg={avatarBgs[0]} />
                  <MemberAvatar $bg={avatarBgs[1]} />
                  <MemberAvatar $bg={avatarBgs[2]} />
                  <MemberAvatar $bg={avatarBgs[3]} $count>
                    5+
                  </MemberAvatar>
                </AvatarGroup>
                <DividerV />
                <InviteBtn type="button">
                  <span className="icon-wrap">
                    <Plus size={14} color="#975bec" strokeWidth={2.5} />
                  </span>
                  invite
                </InviteBtn>
              </InviteRow>
              <MetaBlock>
                <MetaItem>
                  <MetaValue>ORM</MetaValue>
                  <MetaLabel>company</MetaLabel>
                </MetaItem>
                <MetaItem>
                  <MetaValue>15 Jul 2022</MetaValue>
                  <MetaLabel>Start Date</MetaLabel>
                </MetaItem>
              </MetaBlock>
            </RightCol>
          </TopSection>

          <Toolbar>
            <ViewTabs>
              <ViewTab type="button">
                <Calendar size={32} color="#707070" strokeWidth={1.5} />
                <TabPlaceholder $width={141} />
              </ViewTab>
              <ViewTab type="button">
                <List size={32} color="#707070" strokeWidth={1.5} />
                <TabPlaceholder $width={87} />
              </ViewTab>
              <ViewTab $active type="button">
                <LayoutGrid size={32} color="rgba(255,255,255,0.73)" strokeWidth={1.5} />
                Calendar view
              </ViewTab>
            </ViewTabs>

            <IconTabs>
              <IconTab type="button" aria-label="Add">
                <Plus size={32} strokeWidth={1.5} />
              </IconTab>
              <IconTab type="button" aria-label="Star">
                <Star size={32} strokeWidth={1.5} />
              </IconTab>
              <IconTab type="button" aria-label="More">
                <MoreHorizontal size={32} strokeWidth={1.5} />
              </IconTab>
            </IconTabs>
          </Toolbar>

          <TabUnderlineWrap>
            <TabUnderline />
            <TabUnderlineActive />
          </TabUnderlineWrap>

          <DateRow>
            <DateNav>
              <ArrowBtn type="button" style={{ background: 'transparent', width: 28, height: 28 }}>
                <ChevronLeft size={20} color="rgba(255,255,255,0.78)" />
              </ArrowBtn>
              <DateTitle>November 15</DateTitle>
            </DateNav>
            <DayToggle>
              <DayOption $active type="button">
                Day
              </DayOption>
              <DayOption type="button" aria-hidden />
              <DayOption type="button" aria-hidden />
            </DayToggle>
          </DateRow>

          <Timeline>
            {timePills.map((top, i) => (
              <TimePill
                key={top}
                $top={top}
                $bg={i === 1 ? colors.timePillAlt : colors.timePill}
                $height={i === 1 ? 18 : 16}
              />
            ))}

            {gridLines.map((top) => (
              <GridLine key={top} $top={top} $strong={top === 293} />
            ))}

            <CurrentTimeLine $top={293} />
            <TimeLabel>10:00 AM</TimeLabel>

            <DevelopmentCard />
            <UxCopywriteCard />
            <BugFixCard />
            <WebVisualDesignCard />
          </Timeline>
        </Content>
      </Main>
    </Page>
  );
}
