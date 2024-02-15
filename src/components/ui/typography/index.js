import styled from "styled-components";
import { device } from "styles/Breakpoints";

export const MainTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.poppins}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 60px;
  line-height: 90px;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.poppins}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 35px;
  line-height: 52px;
`;
export const SectionSubtitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.poppins}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 25px;
  line-height: 38px;
  ${device.md} {
    font-size: 20px;
    line-height: 30px;
  }
`;
export const Text = styled.span`
  font-family: ${({ theme }) => theme.fonts.inter}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 22px;
  line-height: 27px;
`;
export const Subtext = styled.span`
  font-family: ${({ theme }) => theme.fonts.inter}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 20px;
  line-height: 24px;
`;
export const ButtonText = styled.span`
  font-family: ${({ theme }) => theme.fonts.inter}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 23px;
  line-height: 28px;
`;
