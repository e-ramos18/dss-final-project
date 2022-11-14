import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export type Iprops = {
  value: string;
  reset: () => void;
  onChange: (key: string) => void;
  onSearch: () => void;
  placeHolder?: string;
};

const Search = ({
  value,
  reset,
  onChange,
  onSearch,
  placeHolder = "Search",
}: Iprops) => {
  return (
    <TextField
      fullWidth
      placeholder={placeHolder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onSearch();
        }
      }}
      InputProps={{
        type: "search",
        "aria-label": "search",
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip title="Search">
              <IconButton onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Reset">
              <IconButton onClick={reset}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      size="small"
    />
  );
};

export default Search;
