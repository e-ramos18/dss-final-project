import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { IActor } from "../types";

type IProps = {
  options: IActor[];
  handleChange: (event: object, value: IActor[]) => void;
  helperText?: string;
  defaultValue?: IActor[];
  disabled?: boolean;
};

const SelectActor = ({
  options,
  handleChange,
  defaultValue = [],
  disabled = false,
}: IProps) => {
  return (
    <Autocomplete
      disabled={disabled}
      multiple
      id="tags-outlined"
      options={options}
      getOptionLabel={(option: IActor) => `${option.fname} ${option.lname}`}
      filterSelectedOptions
      onChange={handleChange}
      defaultValue={defaultValue}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Actor"
          placeholder="Select Actor"
        />
      )}
    />
  );
};

export default SelectActor;
