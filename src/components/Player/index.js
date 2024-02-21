import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { actions } from "context/actions";
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
  TrackTitle,
  MobileTrackRow,
} from "./styled";
import { ContentWrapper } from "components/Layout";
import { Pause, Play, SkipLeft, SkipRight, Volume } from "components/ui/Icons";
import IconButton from "components/ui/IconButton";
import { theme } from "styles/Theme";
import { formatSecondsToMSS } from "utils/time";
import { PlayerContext, PlayerDispatchContext } from "context/playerContext";
import { useWindowSize } from "hooks/useWindowSize";
import { breakpoints } from "styles/Breakpoints";

function Player() {
  const { width } = useWindowSize();

  const dispatch = useContext(PlayerDispatchContext);
  const { track, isPlaying } = useContext(PlayerContext);

  const [playerState, setPlayerState] = useState({
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isOpened: false,
  });

  const audioRef = useRef();

  const togglePlay = () => dispatch({ type: actions.TOGGLE_PLAY });
  const toggleOpen = () => {
    if (width > breakpoints.lg && !playerState.isOpened) return;

    setPlayerState((prev) => ({ ...prev, isOpened: !prev.isOpened }));
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

  const handleNextSong = () => dispatch({ type: actions.NEXT_SONG });
  const handlePrevSong = () => dispatch({ type: actions.PREV_SONG });

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log(err));
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, track, isPlaying]);

  if (!track) {
    return null;
  }

  return (
    <Wrapper onClick={playerState.isOpened ? null : toggleOpen} open={playerState.isOpened}>
      <audio
        ref={audioRef}
        src={track.preview}
        controls
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        hidden
        onEnded={handleNextSong}
      ></audio>
      <PlayerLayout
        track={track}
        handlePrevSong={handlePrevSong}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        playerState={playerState}
        handleNextSong={handleNextSong}
        onTrackTimeDrag={onTrackTimeDrag}
        toggleVolume={toggleVolume}
        onVolumeChange={onVolumeChange}
        toggleOpen={toggleOpen}
        width={width}
      />
    </Wrapper>
  );
}

function PlayerLayout({
  track,
  handlePrevSong,
  togglePlay,
  isPlaying,
  playerState,
  handleNextSong,
  onTrackTimeDrag,
  toggleVolume,
  onVolumeChange,
  toggleOpen,
  width,
}) {
  if (width < breakpoints.lg) {
    return (
      <ContentWrapper display="flex" items="center" direction="column" gap={14}>
        <MobileTrackRow>
          <TrackInfoWrapper>
            <TrackImage src={track?.album?.cover} alt={`${track?.album?.title}'s cover`} />
            <TrackInfoTextWrapper>
              <TrackTitle>{track.title}</TrackTitle>
              <ArtistName>{track.title}</ArtistName>
            </TrackInfoTextWrapper>
          </TrackInfoWrapper>

          <IconButton onClick={togglePlay} width={55} height={55} withBackground>
            {isPlaying ? <Pause /> : <Play />}
          </IconButton>
        </MobileTrackRow>
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
          <TrackTime last={1} grey={1}>
            {formatSecondsToMSS(playerState.duration)}
          </TrackTime>
        </ProgressWrapper>
      </ContentWrapper>
    );
  }
  return (
    <ContentWrapper display="flex" items="center">
      <TrackInfoWrapper>
        <TrackImage src={track?.album?.cover} alt={`${track?.album?.title}'s cover`} />
        <TrackInfoTextWrapper>
          <TrackTitle>{track.title}</TrackTitle>
          <ArtistName>{track.title}</ArtistName>
        </TrackInfoTextWrapper>
      </TrackInfoWrapper>
      <ControlsWrapper>
        <IconButton onClick={handlePrevSong}>
          <SkipLeft />
        </IconButton>
        <IconButton onClick={togglePlay} width={55} height={55} withBackground>
          {isPlaying ? <Pause /> : <Play />}
        </IconButton>
        <IconButton onClick={handleNextSong}>
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
  );
}
PlayerLayout.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    duration: PropTypes.number,
    preview: PropTypes.string,
    artist: PropTypes.shape({
      name: PropTypes.string,
    }),
    album: PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string,
    }),
  }),
  handlePrevSong: PropTypes.func,
  handleNextSong: PropTypes.func,
  togglePlay: PropTypes.func,
  isPlaying: PropTypes.bool,
  playerState: PropTypes.shape({
    currentTime: PropTypes.num,
    duration: PropTypes.num,
    volume: PropTypes.string,
  }),
  onTrackTimeDrag: PropTypes.func,
  toggleVolume: PropTypes.func,
  onVolumeChange: PropTypes.func,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
};

export default Player;
