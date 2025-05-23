import {
  FormControl,
  MenuItem,
  MenuProps as MuiMenuProps,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { InputLabel } from "../Label/InputLabel";
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
  options?: string[] | { value: string; label: string }[];
  value: string[] | string;
}

export const Select = ({
  options,
  value,
  children,
  label,
  id,
  ...otherProps
}: SelectProps): JSX.Element => {
  return (
    <StyledWrapper>
      <FormControl fullWidth variant={"standard"}>
        {id && label && <InputLabel id={id}>{label}</InputLabel>}
        <StyledSelect
          {...otherProps}
          labelId={id}
          disableUnderline
          autoWidth={false}
          value={value ? value : []}
          MenuProps={MenuProps}
        >
          {options
            ? options.map((item) =>
                typeof item === "string" ? (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ) : (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              )
            : children}
        </StyledSelect>
      </FormControl>
    </StyledWrapper>
  );
};
