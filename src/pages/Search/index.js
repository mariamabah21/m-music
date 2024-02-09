import React from "react";
import { toast } from "react-toastify";
import SearchIcon from "assets/icons/search.svg";
import { useState, useEffect } from "react";
import TracksTable from "components/TracksTable";
import Input from "components/ui/Input";
import { search } from "services/api";
import { InputWrapper, TableTitle, Wrapper } from "./styled";

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
      <InputWrapper>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          startIcon={SearchIcon}
        />
      </InputWrapper>
      {searchQuery && tracks?.length > 0 && (
        <div>
          <TableTitle>Results by: {searchQuery}</TableTitle>
          <TracksTable isLoading={isLoading} tracks={tracks} />
        </div>
      )}
    </Wrapper>
  );
}

export default Search;
