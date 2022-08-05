import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function SearchBar({ onSetSearchValue }) {
  const [headerSize, setIsTopPage] = React.useState("big");
  const [searchStr, setSearchStr] = React.useState("");

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
  }, []);

  const handleScroll = (event) => {
    const { scrollY } = window;
    if (scrollY < 100) setIsTopPage("big");
    else setIsTopPage("");
  };

  return (
    <div className={`main-container search-bar ${headerSize}`}>
      <div className="input-container">
        <Autocomplete
          onChange={(event, value) => {
            const searchValue = value;
            if (searchValue?.length >= 2) onSetSearchValue(searchValue);
          }}
          onInputChange={(event, value) => {
            setSearchStr(value);
          }}
          freeSolo
          options={searchOptions.map((option) => option)}
          renderInput={(params) => (
            <TextField {...params} label="Search Images" />
          )}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          sx={{ width: 175, height: 55, fontSize: 20 }}
          onClick={() => {
            onSetSearchValue(searchStr);
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

const searchOptions = ["cat", "women", "dog", "space", "surf", "man"];
