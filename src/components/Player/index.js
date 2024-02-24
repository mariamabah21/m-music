import { useContext, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { ContentWrapper } from "components/Layout";
import {
  ArtistName,
  ControlsWrapper,
  ProgressWrapper,
  TrackImage,
  TrackInfoTextWrapper,
  TrackInfoWrapper,
  TrackTime,
  TrackTitle,
  VolumeWrapper,
  Wrapper,
  MobileTrackRow,
  BackButton,
  BigTrackImage,
} from "./styled";
import IconButton from "components/ui/IconButton";
import { Pause, Play, SkipLeft, SkipRight, Volume } from "components/ui/Icons";
import { theme } from "styles/Theme";
import { formatSecondsToMSS } from "utils/time";
import { PlayerContext, PlayerDispatchContext } from "context/playerContext";
import { actions } from "context/actions";
import { useWindowSize } from "hooks/useWindowSize";
import { breakpoints } from "styles/Breakpoints";

function Player() {
  const { width } = useWindowSize();

  const {
    togglePlay,
    toggleOpen,
    handleNextSong,
    handlePrevSong,
    onTimeUpdate,
    onTrackTimeDrag,
    onVolumeChange,
    toggleVolume,
    isPlaying,
    playerState,
    audioRef,
    track,
  } = usePlayer({ width });

  if (!track) {
    return null;
  }

  return (
    <Wrapper
      onClick={playerState.isOpen ? null : toggleOpen}
      full={playerState.isOpen}
      open={playerState.isOpen}
    >
      <audio
        ref={audioRef}
        src={track.preview}
        controls
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        hidden
        onEnded={handleNextSong}
      />
      <PlayerLayout
        track={track}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        playerState={playerState}
        onTrackTimeDrag={onTrackTimeDrag}
        toggleVolume={toggleVolume}
        onVolumeChange={onVolumeChange}
        toggleOpen={toggleOpen}
        width={width}
        open={playerState.isOpen}
      />
    </Wrapper>
  );
}

function PlayerLayout({
  track,
  handlePrevSong,
  handleNextSong,
  togglePlay,
  isPlaying,
  playerState,
  onTrackTimeDrag,
  toggleVolume,
  onVolumeChange,
  toggleOpen,
  open,
  width,
}) {
  if (open) {
    return (
      <ContentWrapper display="flex" direction="column" gap={14}>
        <BackButton onClick={toggleOpen}>Back</BackButton>
        <BigTrackImage src={track.album.cover_big} alt={`${track?.album.title}'s cover`} />
        <MobileTrackRow>
          <TrackInfoWrapper>
            <TrackInfoTextWrapper>
              <TrackTitle>{track.title}</TrackTitle>
              <ArtistName>{track.artist.name}</ArtistName>
            </TrackInfoTextWrapper>
          </TrackInfoWrapper>
        </MobileTrackRow>
        <ProgressWrapper open={1}>
          <TrackTime>{formatSecondsToMSS(playerState.currentTime)}</TrackTime>
          <Slider
            onChange={onTrackTimeDrag}
            step={0.2}
            min={0}
            max={playerState.duration}
            value={playerState.currentTime}
            style={{ padding: "3px 0" }}
            trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
            railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
            handleStyle={{ border: "none", backgroundColor: theme.colors.white, marginTop: -3 }}
          />
          <TrackTime last={1} grey={1}>
            {formatSecondsToMSS(playerState.duration)}
          </TrackTime>
        </ProgressWrapper>
        <ControlsWrapper open={1}>
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
        <VolumeWrapper open={1}>
          <IconButton onClick={toggleVolume} height={24} width={24}>
            <Volume />
          </IconButton>
          <Slider
            step={0.01}
            min={0}
            max={1}
            value={playerState.volume}
            onChange={onVolumeChange}
            style={{ padding: "3px 0" }}
            trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
            railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
            handleStyle={{ border: "none", backgroundColor: theme.colors.white, marginTop: -3 }}
          />
        </VolumeWrapper>
      </ContentWrapper>
    );
  }

  if (width < breakpoints.lg) {
    return (
      <ContentWrapper display="flex" items="center" direction="column" gap={14}>
        <MobileTrackRow>
          <TrackInfoWrapper>
            <TrackImage src={track.album.cover} alt={`${track?.album.title}'s cover`} />
            <TrackInfoTextWrapper>
              <TrackTitle>{track.title}</TrackTitle>
              <ArtistName>{track.artist.name}</ArtistName>
            </TrackInfoTextWrapper>
          </TrackInfoWrapper>

          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              togglePlay();
            }}
            width={55}
            height={55}
            withBackground
          >
            {isPlaying ? <Pause /> : <Play />}
          </IconButton>
        </MobileTrackRow>
        <ProgressWrapper onClick={(event) => event.stopPropagation()}>
          <TrackTime>{formatSecondsToMSS(playerState.currentTime)}</TrackTime>
          <Slider
            onChange={onTrackTimeDrag}
            step={0.2}
            min={0}
            max={playerState.duration}
            value={playerState.currentTime}
            style={{ padding: "3px 0" }}
            trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
            railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
            handleStyle={{ border: "none", backgroundColor: theme.colors.white, marginTop: -3 }}
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
        <TrackImage src={track.album.cover} alt={`${track?.album.title}'s cover`} />
        <TrackInfoTextWrapper>
          <TrackTitle>{track.title}</TrackTitle>
          <ArtistName>{track.artist.name}</ArtistName>
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
          trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
          railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
          handleStyle={{ border: "none", backgroundColor: theme.colors.white, marginTop: -3 }}
        />
        <TrackTime grey={1}>{formatSecondsToMSS(playerState.duration)}</TrackTime>
      </ProgressWrapper>
      <VolumeWrapper>
        <IconButton onClick={toggleVolume} height={24} width={24}>
          <Volume />
        </IconButton>
        <Slider
          step={0.01}
          min={0}
          max={1}
          value={playerState.volume}
          onChange={onVolumeChange}
          style={{ padding: "3px 0" }}
          trackStyle={{ height: 8, backgroundColor: theme.colors.white }}
          railStyle={{ height: 8, backgroundColor: theme.colors.darkGrey }}
          handleStyle={{ border: "none", backgroundColor: theme.colors.white, marginTop: -3 }}
        />
      </VolumeWrapper>
    </ContentWrapper>
  );
}

function usePlayer({ width }) {
  const location = useLocation();
  const dispatch = useContext(PlayerDispatchContext);
  const { track, isPlaying } = useContext(PlayerContext);
  const [playerState, setPlayerState] = useState({
    currentTime: 0,
    duration: 0,
    volume: 0.1,
    isOpen: false,
  });
  const audioRef = useRef();

  const togglePlay = () => {
    dispatch({
      type: actions.TOGGLE_PLAY,
    });
  };

  const toggleOpen = () => {
    if (width > breakpoints.lg && !playerState.isOpen) return;
    setPlayerState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleNextSong = () => {
    dispatch({
      type: actions.HANDLE_NEXT_SONG,
    });
  };

  const handlePrevSong = () => {
    dispatch({
      type: actions.HANDLE_PREV_SONG,
    });
  };

  const onTimeUpdate = () => {
    if (!audioRef?.current) return;
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

  const toggleVolume = () => {
    const newVolume = playerState.volume > 0 ? 0 : 0.1;
    onVolumeChange(newVolume);
  };

  useEffect(() => {
    if (!audioRef?.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log(err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track, audioRef]);

  useEffect(() => {
    if (playerState.isOpen) toggleOpen();
  }, [location]);

  useEffect(() => {
    if (playerState.isOpen) {
      window.scroll(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [playerState.isOpen]);

  if (width > breakpoints.lg && playerState.isOpen) {
    toggleOpen();
  }

  useEffect(() => {
    if (!audioRef?.current) return;
    audioRef.current.volume = 0.1;
  }, [audioRef?.current]);

  return {
    togglePlay,
    toggleOpen,
    handleNextSong,
    handlePrevSong,
    onTimeUpdate,
    onTrackTimeDrag,
    onVolumeChange,
    toggleVolume,
    isPlaying,
    playerState,
    audioRef,
    track,
  };
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
      cover_big: PropTypes.string,
    }),
  }),
  handlePrevSong: PropTypes.func,
  handleNextSong: PropTypes.func,
  togglePlay: PropTypes.func,
  isPlaying: PropTypes.bool,
  playerState: PropTypes.shape({
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    volume: PropTypes.number,
  }),
  onTrackTimeDrag: PropTypes.func,
  toggleVolume: PropTypes.func,
  onVolumeChange: PropTypes.func,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  open: PropTypes.bool,
};

export default Player;
