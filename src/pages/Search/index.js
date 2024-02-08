import React, { useEffect } from "react";
import { TableTitle, Wrapper } from "./styled";
import TracksTable from "components/TracksTable";
import Input from "components/ui/Input";
import { useState } from "react";
import { search } from "services/api";

// tostify import
import { toast } from "react-toastify";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await search(searchQuery);
        setTracks(data);
        console.log(data);
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
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {tracks?.length > 0 && (
        <div>
          <TableTitle>Results by: {searchQuery}</TableTitle>
          <TracksTable isLoading={isLoading} tracks={tracks} />
        </div>
      )}
    </Wrapper>
  );
}

export default Search;
