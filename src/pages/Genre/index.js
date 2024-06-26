import { SongsCountWrapper, TextWrapper, Wrapper } from "./styled";
import TracksTable from "components/TracksTable";
import { Music } from "components/ui/Icons";
import { MainTitle, SmallText } from "components/ui/typography";
import { useLoadData } from "hooks/useLoadData";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { loadGenre } from "services/api";
import { theme } from "styles/Theme";

function Genre() {
  const { genreId } = useParams();
  const [genre, isLoading] = useLoadData(() => loadGenre(genreId));

  return (
    <Wrapper>
      <TextWrapper>
        <MainTitle> {genre?.genre?.name || <Skeleton width={200} />}</MainTitle>{" "}
        <SongsCountWrapper>
          <Music color={theme.colors.secondaryGrey} />
          <SmallText>
            {isLoading ? <Skeleton width={40} /> : `${genre?.tracks?.length} songs`}
          </SmallText>
        </SongsCountWrapper>
      </TextWrapper>
      <TracksTable isLoading={isLoading} tracks={genre?.tracks} />
    </Wrapper>
  );
}

export default Genre;

// {/*    ///   */} ||
