import { SwitchProps } from "@mui/material";
import { useTheme } from "@mui/system";
import { Switch } from "atomicComponents/atoms/Switch";
import { memo } from "react";

const LanguageSwitch = (props: SwitchProps): JSX.Element => {
  const theme = useTheme();
  //TODO: add pl and en svgs
  return (
    <Switch
      checkedBackgroundImage={""}
      uncheckedBackgroundImage={""}
      {...props}
    />
  );
};

export default memo(LanguageSwitch);
