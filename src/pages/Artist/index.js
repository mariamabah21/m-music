import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TracksTable from "components/TracksTable";
import { Music } from "components/ui/Icons";
import { MainTitle, SectionTitle, SmallText } from "components/ui/typography";
import { loadArtist } from "services/api";
import { theme } from "styles/Theme";
import { breakpoints } from "styles/Breakpoints";
import { useWindowSize } from "hooks/useWindowSize";
import {
  ArtistImage,
  ArtistImageLoaderWrapper,
  ArtistInfoWrapper,
  TextWrapper,
  Wrapper,
} from "./styled";

function Artist() {
  const { width } = useWindowSize();
  const { artistId } = useParams();
  const [artist, setArtist] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const artist = await loadArtist(artistId);
        setArtist(artist);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Wrapper>
      <ArtistInfoWrapper>
        {artist ? (
          <ArtistImage src={artist?.artist?.picture_big} alt={`${artist?.artist?.name}'s photo`} />
        ) : (
          <Skeleton
            width={width < breakpoints.md ? "100%" : 350}
            height={width < breakpoints.md ? 176 : 350}
            borderRadius={25}
            wrapper={ArtistImageLoaderWrapper}
          />
        )}
        <TextWrapper>
          <MainTitle>{artist?.artist?.name || <Skeleton width={200} />}</MainTitle>

          <Music color={theme.colors.secondaryGrey} />
          <SmallText>
            {isLoading ? <Skeleton width={40} /> : `${artist?.artist?.nb_fan} Fans`}
          </SmallText>
        </TextWrapper>
      </ArtistInfoWrapper>
      <div>
        <SectionTitle>Top Tracks</SectionTitle>
        <TracksTable isLoading={isLoading} tracks={artist?.tracks} />
      </div>
    </Wrapper>
  );
}

export default Artist;

// {/*    ///   */} ||  ` `
