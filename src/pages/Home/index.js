import { Hero, Genres, Artists } from "components/HomePage";
import { ContentWrapper, TrendsAndArtistsSection } from "./styled";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Home() {
  return (
    <ContentWrapper>
      <Hero />
      <Genres />
      <TrendsAndArtistsSection>
        <div>Songs Table</div>
        <Artists />
      </TrendsAndArtistsSection>
    </ContentWrapper>
  );
}

export default Home;
