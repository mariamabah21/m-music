import { Text } from "components/ui/typography";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
  cursor: pointer;
`;

export const Image = styled.img`
  height: 95px;
  width: 95px;
  border-radius: 50%;
`;

export const ArtistName = styled(Text)`
  max-width: 140px;
  text-align: center;
`;