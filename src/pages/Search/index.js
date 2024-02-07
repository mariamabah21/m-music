import React, { useEffect } from "react";
import { TableTitle, Wrapper } from "./styled";
import { useState } from "react";

// tostify import
import { toast } from "react-toastify";
import { search } from "services/api";

function Search() {
  const [isLoading, setisLoading] = useState(false);
  const [tracks, setTracks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await search();
        setTracks(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) loadData();
  }, [searchQuery]);

  return (
    <Wrapper>
      <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      <TableTitle>Result by: {searchQuery}</TableTitle>
    </Wrapper>
  );
}

export default Search;
