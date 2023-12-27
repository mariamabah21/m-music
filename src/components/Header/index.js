import { Logo, Search } from "components/ui/Icons";
import { SectionSubtitle } from "components/ui/typography";
import { LogoWrapper, Wrapper } from "./styled";
import IconButton from "components/ui/IconButton";

function Header() {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
        <SectionSubtitle>MaMusic</SectionSubtitle>
      </LogoWrapper>
      <IconButton withBackground>
        <Search />
      </IconButton>
    </Wrapper>
  );
}

export default Header;
