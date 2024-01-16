import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Wrapper, ArtistsWrapper, ArtistSkeletonWrapper } from "./styled";
import ArtistCard from "./ArtistCard";

function Artists() {
  const [artists, setGenres] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await axios.get("/genre");
      setGenres(data.data.data.filter((genre) => genre.name.toLowerCase() !== "todos"));
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <Wrapper>
      <ArtistsWrapper>
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <Skeleton
              wrapper={ArtistSkeletonWrapper}
              key={num}
              height={116}
              width={220}
              borderRadius={25}
            />
          ))}
        <Swiper slidesPerView="auto" spaceBetween={20} modules={[Pagination]}>
          {!isLoading &&
            artists?.map((genre) => (
              <SwiperSlide key={genre.id} style={{ width: "auto" }}>
                <ArtistCard name={genre.name} image={genre.picture_medium} />
              </SwiperSlide>
            ))}
        </Swiper>
      </ArtistsWrapper>
    </Wrapper>
  );
}

export default Artists;
