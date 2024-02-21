import { MOBILE_HEADER_HEIGHT, MOBILE_PLAYER_HEIGHT, PLAYER_HEIGHT } from "common/constants";
import { Subtext, Text } from "components/ui/typography";
import styled from "styled-components";
import { device } from "styles/Breakpoints";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  align-items: ${(props) => (props.open ? "flex-start" : "center")};
  height: ${PLAYER_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.secondaryBlack};
  background-color: ${({ theme, open }) =>
    open ? theme.colors.black : theme.colors.secondaryBlack};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex["30"]};

  ${device.lg} {
    // height: ${MOBILE_PLAYER_HEIGHT}px;
    height: ${(props) =>
      props.open ? `calc(100vh - ${MOBILE_HEADER_HEIGHT}px)` : `${MOBILE_PLAYER_HEIGHT}px`};
    border-top-right-radius: ${(props) => (props.open ? 0 : "25px")};
    border-top-left-radius: ${(props) => (props.open ? 0 : "25px")};
  }
`;

export const TrackInfoWrapper = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  min-width: 250px;

  @media (max-width: 1400px) {
    min-width: 280px;
  }
  ${device.lg} {
    gap: 15px;
  }
`;

export const TrackInfoTextWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding-right: 15px;

  ${device.lg} {
    gap: 2px;
  }
`;

export const TrackImage = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 15px;

  ${device.md} {
    height: 45px;
    width: 45px;
  }
`;

export const TrackTitle = styled(Text)`
  font-weight: normal;
  display: -webkit-box;
  overflow: hidden;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const ArtistName = styled(Subtext)`
  color: ${({ theme }) => theme.colors.secondaryGrey};
  font-weight: normal;
  display: -webkit-box;
  overflow: hidden;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
`;
export const MobileTrackRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 60px;
  width: 100%;

  ${device.lg} {
    margin-left: 0;
  }
`;

export const TrackTime = styled(Subtext)`
  width: 80px;
  margin: 0 20px;
  color: ${(props) => (props.grey ? props.theme.colors.secondaryGrey : "inherit")};

  ${device.lg} {
    margin: ${(props) => (props.last ? "0 0 0 20px" : 0)};
    text-align: ${(props) => (props.last ? "right" : "inherit")};
  }
`;

export const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin-left: 130px;
  min-width: 180px;

  ${device.xl} {
    margin-left: 60px;
  }
`;

export const BackButton = styled.button`
  border: none;
  background: none;
`;
