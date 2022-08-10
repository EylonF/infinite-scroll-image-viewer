import React from "react";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchBar({
  onSetSearchValue,
  onSetPhotosResponse,
  onSetPage,
  onScrollUp,
  gSearchValue,
}) {
  const [headerSize, setHeaderSize] = React.useState("big");
  const [searchStr, setSearchStr] = React.useState("");
  let history = useHistory();

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
  }, []);

  React.useEffect(() => {
    if (gSearchValue) setSearchStr(gSearchValue);
  }, [gSearchValue]);

  const handleScroll = (event) => {
    const { scrollY } = window;
    if (scrollY < 100) setHeaderSize("big");
    else setHeaderSize("");
  };
  const handleChenge = (searchValue) => {
    onScrollUp();
    onSetPhotosResponse(null);
    history.push(`/?searchStr=${searchValue}`);
  };

  return (
    <div className={`main-container search-bar ${headerSize}`}>
      <div className="input-container">
        <Autocomplete
          onChange={(event, value) => {
            const searchValue = value;
            if (searchValue?.length >= 2) {
              handleChenge(searchValue);
            }
          }}
          onInputChange={(event, value) => {
            setSearchStr(value);
          }}
          freeSolo
          options={searchOptions.map((option) => option)}
          renderInput={(params) => {
            if (gSearchValue) params.inputProps.value = searchStr;
            return (
              <TextField {...params} label="Search Images" value={"name"} />
            );
          }}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          sx={{ width: 175, height: 55, fontSize: 20 }}
          onClick={() => {
            handleChenge(searchStr);
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

const searchOptions = ["cat", "women", "dog", "space", "surf", "man"];
