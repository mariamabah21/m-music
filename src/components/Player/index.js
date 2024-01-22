import React, { useContext, useEffect, useRef, useState } from "react";
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
import { formatSecondsToMSS } from "utils/time";
import { PlayerContext } from "context/playerContext";

function Player(props) {
  const { track, isPlaying } = useContext(PlayerContext);

  console.log(track);

  const [playerState, setPlayerState] = useState({
    currentTime: 0,
    duration: 0,
    volume: 0.7,
  });

  const audioRef = useRef();

  const togglePlay = () => {
    // setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const toggleVolume = () => {
    const newVolume = playerState.volume > 0 ? 0 : 1;

    onVolumeChange(newVolume);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;

    setPlayerState((prev) => ({ ...prev, currentTime, duration }));
  };

  const onTrackTimeDrag = (newTime) => {
    if (!audioRef?.current) return;

    audioRef.current.currentTime = newTime;

    setPlayerState((prev) => ({ ...prev, currentTime: newTime }));
  };

  const onVolumeChange = (newVolume) => {
    if (!audioRef?.current) return;
    audioRef.current.volume = newVolume;

    setPlayerState((prev) => ({ ...prev, volume: newVolume }));
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, track, isPlaying]);

  if (!track) {
    return null;
  }

  return (
    <Wrapper>
      <ContentWrapper display="flex" items="center">
        <audio
          ref={audioRef}
          src={track.preview}
          controls
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onTimeUpdate}
          hidden
        ></audio>
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
          <TrackTime>{formatSecondsToMSS(playerState.currentTime)}</TrackTime>
          <Slider
            onChange={onTrackTimeDrag}
            step={0.2}
            min={0}
            max={playerState.duration}
            value={playerState.currentTime}
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
          <TrackTime>{formatSecondsToMSS(playerState.duration)}</TrackTime>
        </ProgressWrapper>
        <VolumeWrapper>
          <IconButton onClick={toggleVolume} height={24} width={24}>
            <Volume />
          </IconButton>
          <Slider
            onChange={onVolumeChange}
            step={0.01}
            min={0}
            max={1}
            value={playerState.volume}
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
