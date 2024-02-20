import { TextWrapper } from "components/HomePage/Hero/styled";
import TracksTable from "components/TracksTable";
import { Music } from "components/ui/Icons";
import { MainTitle, SmallText } from "components/ui/typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadGenre } from "services/api";

function Genre() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const genre = await loadGenre(genreId);
        console.log(genre);

        setGenre(genre);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      {/* <TextWrapper>
        <MainTitle> {genre.name}</MainTitle>
        <SongsCountWrapper>
          <Music />
          <SmallText> </SmallText>
        </SongsCountWrapper>
      </TextWrapper>*/}
      <TracksTable isLoading={isLoading} tracks={genre?.tracks} />
    </div>
  );
}

export default Genre;

// {/*    ///   */}
