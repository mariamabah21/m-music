import { Hero } from "components/HomePage";
import { ContentWrapper } from "./styled";
import Genres from "components/HomePage/Genres";

function Home() {
  return (
    <ContentWrapper>
      <Hero />
      <Genres />
      <div>Songs Table</div>
      <aside>Artists</aside>
    </ContentWrapper>
  );
}

export default Home;
