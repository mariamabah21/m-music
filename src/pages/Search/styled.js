import styled from "styled-components";
import { SectionSubtitle } from "components/ui/typography";
import { PLAYER_HEIGHT } from "common/constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  padding-top: 52px;
  padding-bottom: calc(${PLAYER_HEIGHT}px + 50px);
`;
export const TableTitle = styled(SectionSubtitle)`
  margin-bottom: 30px;
`;

// ``
