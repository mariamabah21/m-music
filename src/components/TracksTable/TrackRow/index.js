import React from "react";
import { Heart, Play } from "components/ui/Icons";
import { formatSecondsToMSS } from "utils/time";
import { Subtext } from "components/ui/typography";
import PropTypes from "prop-types";
import {
  TableData,
  TrackInfo,
  TrackInfoTextWrapper,
  TrackInfoImage,
  TrackTitle,
  TrackSubText,
  SongNumberText,
  StyledIconButton,
  StyledTrackRow,
  IconWrapper,
} from "./styled";

function TrackRow({}) {
  return (
    <StyledTrackRow key={track.id}>
      <TableData>
        <SongNumberText className="text">{String(index + 1).padStart(2, "0")}</SongNumberText>
        <IconWrapper className="icon">
          <Play />
        </IconWrapper>
      </TableData>
      <TrackInfo>
        <TrackInfoImage src={track.album.cover} alt={`${track.album.name}'s cover`} />
        <TrackInfoTextWrapper>
          <TrackTitle>{track.title}</TrackTitle>
          <TrackSubText>{track.artist.name}</TrackSubText>
        </TrackInfoTextWrapper>
      </TrackInfo>
      <TableData>
        <Subtext>{formatSecondsToMSS(track.duration)}</Subtext>
      </TableData>
      <TableData>
        <TrackSubText>{track.album.title}</TrackSubText>
      </TableData>
      <TableData>
        <StyledIconButton width={25} height={25}>
          <Heart />
        </StyledIconButton>
      </TableData>
    </StyledTrackRow>
  );
}

TrackRow.propTypes = {};

export default TrackRow;
