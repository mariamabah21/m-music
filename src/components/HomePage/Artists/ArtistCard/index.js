import React from "react";
import PropTypes from "prop-types";
import { Image, Wrapper } from "./styled";
import { Text } from "components/ui/typography";

function ArtistCard({ image, name }) {
  return (
    <Wrapper>
      <Image src={image} alt={`${name}'s photo`} />
      <Text>{name}</Text>
    </Wrapper>
  );
}

ArtistCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

export default ArtistCard;
