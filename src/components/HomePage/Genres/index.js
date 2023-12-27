import { SectionSubtitle } from "components/ui/typography";
import { Wrapper, TitleRow, ButtonsWrapper, Button } from "./styled";
import { ArrowLeft, ArrowRight } from "components/ui/Icons";

function Genres() {
  return (
    <Wrapper>
      <TitleRow>
        <SectionSubtitle>Genres</SectionSubtitle>
        <ButtonsWrapper>
          <Button withBackground width={36} height={36}>
            <ArrowLeft />
          </Button>
          <Button withBackground width={36} height={36}>
            <ArrowRight />
          </Button>
        </ButtonsWrapper>
      </TitleRow>
    </Wrapper>
  );
}

export default Genres;
