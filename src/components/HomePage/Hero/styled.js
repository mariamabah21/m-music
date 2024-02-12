import styled from "styled-components";
import { Text } from "components/ui/typography";
import Button from "components/ui/Button";

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0 35px;
  border-radius: 25px;
  height: 382px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple};
`;
export const TextWrapper = styled.div`
  padding-left: 123px;
`;

export const HeroText = styled(Text)`
  display: block;
  max-width: 274px;
`;

export const PlayButton = styled(Button)`
  display: flex;
  gap: 14px;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.6;
  }
`;
