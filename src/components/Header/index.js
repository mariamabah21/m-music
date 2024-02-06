import { Logo, Search } from "components/ui/Icons";
import { SectionSubtitle } from "components/ui/typography";
import { LogoWrapper, Wrapper } from "./styled";
import IconButton from "components/ui/IconButton";
import { ContentWrapper } from "components/Layout";
import { Link } from "react-router-dom";

function Header(withBackground) {
  return (
    <Wrapper>
      <ContentWrapper display="flex" items="center" content="space-between">
        <LogoWrapper>
          <Logo />
          <SectionSubtitle>MaMusic</SectionSubtitle>
        </LogoWrapper>
        <Link>
          <IconButton bg={withBackground}>
            <Search />
          </IconButton>
        </Link>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Header;
