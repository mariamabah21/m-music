import { Hero, Genres, Artists } from "components/HomePage";
import { ContentWrapper, GreyTitle, TrendsAndArtistsSection } from "./styled";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { SectionTitle } from "components/ui/typography";

function Home() {
  return (
    <ContentWrapper>
      <Hero />
      <Genres />
      <TrendsAndArtistsSection>
        <div>
          <GreyTitle>Global</GreyTitle>
          <SectionTitle>Trending Right now</SectionTitle>
          <div>songs table</div>
        </div>
        <aside>
          <GreyTitle>Global</GreyTitle>
          <SectionTitle>Top Artists</SectionTitle>

          <Artists />
        </aside>
      </TrendsAndArtistsSection>
    </ContentWrapper>
  );
}

export default Home;
