import { Hero, Genres, Artists } from "components/HomePage";
import { loadCharts, loadTopRadioTracks } from "services/api";
import { GreyTitle, StyledAside, TrendsAndArtistsSection } from "./styled";
import { SectionTitle } from "components/ui/typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import TracksTable from "components/TracksTable";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useLoadData } from "hooks/useLoadData";

function Home() {
  const [data, isLoading] = useLoadData(() => Promise.all([loadCharts(), loadTopRadioTracks()]));
  const [chart, radio] = data || [];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [chart, radio] = await Promise.all([loadCharts(), loadTopRadioTracks()]);
        setChart(chart);
        setRadio(radio);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <main>
      <Hero tracks={radio} />
      <Genres />
      <TrendsAndArtistsSection>
        <div>
          <GreyTitle>Global</GreyTitle>
          <SectionTitle>Trending Right now</SectionTitle>
          <TracksTable isLoading={isLoading} tracks={chart?.tracks?.data} />
        </div>
        <StyledAside>
          <GreyTitle>Global</GreyTitle>
          <SectionTitle>Top Artists</SectionTitle>
          <Artists isLoading={isLoading} artists={chart?.artists?.data} />
        </StyledAside>
      </TrendsAndArtistsSection>
    </main>
  );
}

export default Home;
