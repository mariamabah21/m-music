import styled from "styled-components";

export const StyledInput = styled.input`
  background: ${({ theme }) => theme.colors.lightWhite};
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  line-height: 27px;
  border-radius: 25px;
  padding: 17px 0;
  border: 2px solid ${({ theme }) => theme.colors.black};

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.white};
    outline: none;
  }
`;
