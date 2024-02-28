import PropTypes from "prop-types";
import { Subtext } from "components/ui/typography";

import { TableHead, Table, TableHeading, TableHeadingTime, Line } from "./styled";
import TrackRow from "./TrackRow";
import Skeleton from "react-loading-skeleton";
import { useContext } from "react";
import { PlayerContext, PlayerDispatchContext } from "context/playerContext";
import { actions } from "context/actions";
import { useWindowSize } from "hooks/useWindowSize";
import { breakpoints } from "styles/Breakpoints";

function TracksTable([tracks, isLoading]) {
  // [] OR {} ??
  const { width } = useWindowSize();
  const dispatch = useContext(PlayerDispatchContext);
  const { track, isPlaying, savedTrackIds } = useContext(PlayerContext);

  const handleTrackClick = (clickedTrack) => {
    if (track?.id === clickedTrack.id) {
      dispatch({ type: actions.TOGGLE_PLAY });
    } else {
      dispatch({
        type: actions.SET_TRACKS_DATA,
        track: clickedTrack,
        tracks: tracks,
        isPlaying: true,
      });
    }
  };
  const handleSaveTrackClick = (trackId) => {
    dispatch({ type: actions.TOGGLE_SAVE_TRACK, trackId });
  };

  return (
    <Table cellSpacing={0}>
      <TableHead>
        <tr>
          <TableHeading first={1}>
            <Subtext> {isLoading ? <Skeleton width={25} /> : "#"} </Subtext>
          </TableHeading>
          <TableHeading>
            <Subtext> {isLoading ? <Skeleton /> : "Song name"} </Subtext>
          </TableHeading>
          {width > breakpoints.md && (
            <TableHeadingTime>
              <Subtext> {isLoading ? <Skeleton /> : "Time"} </Subtext>
            </TableHeadingTime>
          )}
          {width > breakpoints.md && (
            <TableHeading>
              <Subtext> {isLoading ? <Skeleton /> : "Album name"} </Subtext>
            </TableHeading>
          )}
          <TableHeading>
            <Subtext> {isLoading ? <Skeleton width={70} /> : "Action"} </Subtext>
          </TableHeading>
        </tr>
      </TableHead>
      <tbody>
        <tr>
          <Line colSpan={5} />
        </tr>
        {!isLoading &&
          tracks?.map((currentTrack, index) => (
            <TrackRow
              isPlaying={track?.id === currentTrack.id && isPlaying}
              onClick={handleTrackClick}
              key={currentTrack.id}
              track={currentTrack}
              index={index}
              handleSaveTrackClick={handleSaveTrackClick}
              isSaved={savedTrackIds.includes(currentTrack.id)}
              screenWidth={width}
            />
          ))}

        {isLoading &&
          [...Array(9).keys()].map((num) => <TrackRow key={num} index={num} screenWidth={width} />)}
      </tbody>
    </Table>
  );
}

TracksTable.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
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
  ),
  isLoading: PropTypes.bool,
};

export default TracksTable;
