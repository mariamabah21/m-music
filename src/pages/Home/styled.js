import { PLAYER_HEIGHT } from "common/constants";
import { SectionSubtitle } from "components/ui/typography";
import styled from "styled-components";
import { device } from "styles/Breakpoints";

export const TrendsAndArtistsSection = styled.section`
  display: grid;
  grid-template-columns: 65% 35%;
  padding-bottom: calc(${PLAYER_HEIGHT}px + 50px);
  overflow: hidden;

  ${device.xl} {
    display: flex;
    flex-direction: column;
    gap: 45px;
  }
`;

export const GreyTitle = styled(SectionSubtitle)`
  color: ${({ theme }) => theme.colors.secondaryGrey};
`;

export const StyledAside = styled.aside`
  margin-left: 90px;

  ${device.xl} {
    margin-left: 0;
  }
`;
