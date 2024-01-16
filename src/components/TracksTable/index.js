import PropTypes from "prop-types";
import { Subtext } from "components/ui/typography";
import { Heart } from "components/ui/Icons";
import { formatSecondsToMSS } from "utils/time";
import {
  TableHead,
  Table,
  TableHeading,
  TableData,
  TrackInfo,
  TrackInfoTextWrapper,
  TrackInfoImage,
  TrackTitle,
  TrackSubText,
  SongNumberText,
  StyledIconButton,
  TableHeadingTime,
  Line,
} from "./styled";

function TracksTable({ tracks }) {
  console.log(tracks);
  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeading>
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
          <tr key={track.id}>
            <TableData>
              <SongNumberText>{String(index + 1).padStart(2, "0")}</SongNumberText>
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
          </tr>
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
