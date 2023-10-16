import {
  FormControl,
  MenuItem,
  MenuProps as MuiMenuProps,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { StyledSelect, StyledWrapper } from "./styles";

const MenuProps: Partial<MuiMenuProps> = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
  MenuListProps: {
    sx: {
      width: "calc(100% - 32px)",
      margin: "0 auto",
      wordWrap: "break-word",
    },
  },
  PaperProps: {
    style: {
      borderRadius: "20px",
      maxHeight: 300,
      margin: 0,
    },
  },
};

export interface SelectProps extends MuiSelectProps {
  options?: string[];
  value: string[] | string;
}

export const Select = ({
  options,
  value,
  children,
  ...otherProps
}: SelectProps): JSX.Element => {
  return (
    <StyledWrapper>
      <FormControl fullWidth variant={"standard"}>
        <StyledSelect
          {...otherProps}
          disableUnderline
          autoWidth={false}
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
