import PropTypes from "prop-types";
import { Subtext } from "components/ui/typography";

import { TableHead, Table, TableHeading, TableHeadingTime, Line, TrackRow } from "./styled";

function TracksTable({ tracks }) {
  console.log(tracks);
  return (
    <Table cellSpacing={0}>
      <TableHead>
        <tr>
          <TableHeading first>
            <Subtext>#</Subtext>
          </TableHeading>
          <TableHeading>
            <Subtext>Song name</Subtext>
          </TableHeading>
          <TableHeadingTime>
            <Subtext>Time</Subtext>
          </TableHeadingTime>
          <TableHeading>
            <Subtext>Album name</Subtext>
          </TableHeading>
          <TableHeading>
            <Subtext>Action</Subtext>
          </TableHeading>
        </tr>
      </TableHead>
      <tbody>
        <tr>
          <Line colSpan={5} />
        </tr>
        {tracks?.map((track, index) => (
          <TrackRow key={track.id} track={track} index={index} />
        ))}
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
};

export default TracksTable;
