import PropTypes from "prop-types";
import { Subtext } from "components/ui/typography";

import { TableHead, Table, TableHeading, TableHeadingTime, Line } from "./styled";
import TrackRow from "./TrackRow";
import Skeleton from "react-loading-skeleton";
import { useContext } from "react";
import { PlayerDispatchContext } from "context/playerContext";
import { actions } from "context/actions";

function TracksTable({ tracks, isLoading }) {
  const dispatch = useContext(PlayerDispatchContext);
  const handleTrackClick = (track) => {
    dispatch({
      type: actions.SET_TRACKS_DATA,
      track: track,
      tracks: tracks,
      isPlaying: true,
    });
  };

  return (
    <Table cellSpacing={0}>
      <TableHead>
        <tr>
          <TableHeading first>
            <Subtext> {isLoading ? <Skeleton width={25} /> : "#"} </Subtext>
          </TableHeading>
          <TableHeading>
            <Subtext> {isLoading ? <Skeleton /> : "Song name"} </Subtext>
          </TableHeading>
          <TableHeadingTime>
            <Subtext> {isLoading ? <Skeleton /> : "Time"} </Subtext>
          </TableHeadingTime>
          <TableHeading>
            <Subtext> {isLoading ? <Skeleton /> : "Album name"} </Subtext>
          </TableHeading>
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
          tracks?.map((track, index) => (
            <TrackRow onClick={handleTrackClick} key={track.id} track={track} index={index} />
          ))}

        {isLoading && [...Array(9).keys()].map((num) => <TrackRow key={num} index={num} />)}
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
