import styled from "styled-components";
import { MainTitle, Text } from "components/ui/typography";
import Button from "components/ui/Button";
import { device } from "styles/Breakpoints";

const HERO_IMAGE_HIDDEN_BREAKPOINT = 1050;

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0 35px;
  border-radius: 25px;
  height: 382px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple};

  @media (max-width: ${HERO_IMAGE_HIDDEN_BREAKPOINT}px) {
    align-items: center;
    height: 305px;
    text-align: center;
    padding: 41px 32px;
    margin: 30px 0 35px;
  }
`;
export const TextWrapper = styled.div`
  padding-left: 123px;

  ${device.xl} {
    padding-left: 70px;
  }
  @media (max-width: ${HERO_IMAGE_HIDDEN_BREAKPOINT}px) {
    width: 100%;
    padding: 0;
  }
`;

export const HeroImage = styled.img`
  @media (max-width: ${HERO_IMAGE_HIDDEN_BREAKPOINT}px) {
    display: none;
  }
`;

export const HeroText = styled(Text)`
  display: block;
  max-width: 274px;
`;

export const HeroTitleText = styled(MainTitle)`
  @media (max-width: ${HERO_IMAGE_HIDDEN_BREAKPOINT}px) {
    font-size: 45px;
    line-height: 68px;
  }
`;

export const PlayButton = styled(Button)`
  display: flex;
  gap: 14px;
  align-items: center;

  @media (max-width: ${HERO_IMAGE_HIDDEN_BREAKPOINT}px) {
    margin: 30px auto;
    width: 100%;
    justify-content: center;
  }

  //&:hover {
  //opacity: 0.8;
  //}
  //&:disabled {
  //opacity: 0.6;
  //}
`;
