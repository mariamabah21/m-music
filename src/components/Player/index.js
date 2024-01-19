import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import {
  Wrapper,
  TrackInfoWrapper,
  TrackInfoTextWrapper,
  TrackImage,
  ArtistName,
  ControlsWrapper,
  ProgressWrapper,
  TrackTime,
  VolumeWrapper,
} from "./styled";
import { ContentWrapper } from "components/Layout";
import { Text } from "components/ui/typography";
import { Pause, Play, SkipLeft, SkipRight, Volume } from "components/ui/Icons";
import IconButton from "components/ui/IconButton";
import { theme } from "styles/Theme";

const track = {
  id: 1858539707,
  title: "SNAP",
  title_short: "SNAP",
  title_version: "",
  link: "https://www.deezer.com/track/1858539707",
  duration: 179,
  rank: 963121,
  explicit_lyrics: false,
  explicit_content_lyrics: 0,
  explicit_content_cover: 0,
  preview: "https://cdns-preview-3.dzcdn.net/stream/c-3af9b97bced2da58372505fec78b3edf-3.mp3",
  md5_image: "24e217baa78c0c56263677219f78e861",
  position: 1,
  artist: {
    id: 142015162,
    name: "Rosa Linn",
    link: "https://www.deezer.com/artist/142015162",
    picture: "https://api.deezer.com/artist/142015162/image",
    picture_small:
      "https://e-cdns-images.dzcdn.net/images/artist/ee1d007dac3e748327200795ff05036f/56x56-000000-80-0-0.jpg",
    picture_medium:
      "https://e-cdns-images.dzcdn.net/images/artist/ee1d007dac3e748327200795ff05036f/250x250-000000-80-0-0.jpg",
    picture_big:
      "https://e-cdns-images.dzcdn.net/images/artist/ee1d007dac3e748327200795ff05036f/500x500-000000-80-0-0.jpg",
    picture_xl:
      "https://e-cdns-images.dzcdn.net/images/artist/ee1d007dac3e748327200795ff05036f/1000x1000-000000-80-0-0.jpg",
    radio: true,
    tracklist: "https://api.deezer.com/artist/142015162/top?limit=50",
    type: "artist",
  },
  album: {
    id: 344520787,
    title: "SNAP",
    cover: "https://api.deezer.com/album/344520787/image",
    cover_small:
      "https://e-cdns-images.dzcdn.net/images/cover/24e217baa78c0c56263677219f78e861/56x56-000000-80-0-0.jpg",
    cover_medium:
      "https://e-cdns-images.dzcdn.net/images/cover/24e217baa78c0c56263677219f78e861/250x250-000000-80-0-0.jpg",
    cover_big:
      "https://e-cdns-images.dzcdn.net/images/cover/24e217baa78c0c56263677219f78e861/500x500-000000-80-0-0.jpg",
    cover_xl:
      "https://e-cdns-images.dzcdn.net/images/cover/24e217baa78c0c56263677219f78e861/1000x1000-000000-80-0-0.jpg",
    md5_image: "24e217baa78c0c56263677219f78e861",
    tracklist: "https://api.deezer.com/album/344520787/tracks",
    type: "album",
  },
  type: "track",
};

function Player(props) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });
  const audioRef = useRef();

  const togglePlay = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (playerState.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, track, playerState.isPlaying]);

  return (
    <Wrapper>
      <ContentWrapper display="flex" items="center">
        <audio ref={audioRef} src={track.preview} controls></audio>
        <TrackInfoWrapper>
          <TrackImage src={track.album.cover} alt={`${track?.album.title}'s cover`} />
          <TrackInfoTextWrapper>
            <Text>{track.title}</Text>
            <ArtistName>{track.title}</ArtistName>
          </TrackInfoTextWrapper>
        </TrackInfoWrapper>
        <ControlsWrapper>
          <IconButton>
            <SkipLeft />
          </IconButton>
          <IconButton onClick={togglePlay} width={55} height={55} withBackground>
            {playerState.isPlaying ? <Pause /> : <Play />}
          </IconButton>
          <IconButton>
            <SkipRight />
          </IconButton>
        </ControlsWrapper>
        <ProgressWrapper>
          <TrackTime>0:00</TrackTime>
          <Slider
            style={{ padding: "3px 0" }}
            trackStyle={{
              height: 8,
              backgroundColor: theme.colors.white,
            }}
            railStyle={{
              height: 8,
              backgroundColor: theme.colors.darkGrey,
            }}
            handleStyle={{
              border: "none",
              backgroundColor: theme.colors.white,
              marginTop: -3,
            }}
          />
          <TrackTime>2:30</TrackTime>
        </ProgressWrapper>
        <VolumeWrapper>
          <IconButton height={24} width={24}>
            <Volume />
          </IconButton>
          <Slider
            style={{ padding: "3px 0" }}
            trackStyle={{
              height: 8,
              backgroundColor: theme.colors.white,
            }}
            railStyle={{
              height: 8,
              backgroundColor: theme.colors.darkGrey,
            }}
            handleStyle={{
              border: "none",
              backgroundColor: theme.colors.white,
              marginTop: -3,
            }}
          />
        </VolumeWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Player;
