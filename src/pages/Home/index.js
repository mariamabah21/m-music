import { Hero, Genres, Artists } from "components/HomePage";
import { ContentWrapper, GreyTitle, StyledAside, TrendsAndArtistsSection } from "./styled";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { SectionTitle } from "components/ui/typography";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [chart, setChart] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await axios.get("/chart");
      setChart(data.data);
      setIsLoading(false);
    };

    loadData();
  }, []);
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
        <StyledAside>
          <GreyTitle>Global</GreyTitle>
          <SectionTitle>Top Artists</SectionTitle>
          <Artists isLoading={isLoading} artists={chart?.artists?.data} />
        </StyledAside>
      </TrendsAndArtistsSection>
    </ContentWrapper>
  );
}

export default Home;
