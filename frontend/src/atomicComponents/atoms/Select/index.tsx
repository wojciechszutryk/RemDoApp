import {
  FormControl,
  MenuItem,
  MenuProps as MuiMenuProps,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { StyledSelect, StyledWrapper } from "./styles";

const MenuProps: Partial<MuiMenuProps> = {
  variant: "menu",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  PaperProps: {
    style: {
      boxShadow: "1px 4px 15px 0px #0000001a",
      borderRadius: "0px 0px 8px 8px",
      margin: 0,
    },
  },
};

interface Props extends MuiSelectProps {
  options?: string[];
  value: string[] | string;
}

export const Select = ({
  options,
  value,
  children,
  ...otherProps
}: Props): JSX.Element => {
  return (
    <StyledWrapper>
      <FormControl fullWidth variant={"standard"}>
        <StyledSelect
          {...otherProps}
          autoWidth={true}
          disableUnderline
          value={value ? value : []}
          MenuProps={MenuProps}
        >
          {options
            ? options.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))
            : children}
        </StyledSelect>
      </FormControl>
    </StyledWrapper>
  );
};
