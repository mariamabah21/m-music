import { Wrapper } from "components/Header/styled";
import DesktopRadioImage from "assets/images/radio-desktop.png";
import { TextWrapper } from "./styled";
import { MainTitle, Text } from "components/ui/typography";

function Hero() {
  return (
    <Wrapper>
      <TextWrapper>
        <MainTitle>Radio</MainTitle>
        <Text>Pick your todays mood. We will play a perfect mix!</Text>
      </TextWrapper>
      <img src={DesktopRadioImage} alt="Hands holding radio" />
    </Wrapper>
  );
}

export default Hero;
