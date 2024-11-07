import { SwitchProps } from "@mui/material";
import { useTheme } from "@mui/system";
import { Switch } from "atomicComponents/atoms/Switch";
import { memo } from "react";

const LanguageSwitch = (props: SwitchProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Switch
      checkedBackgroundImage={`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="17" width="17" viewBox="0 0 23 25"><path fill="${encodeURIComponent(
        `${theme.palette.primary.main}`
      )}" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z"></path></svg>')`}
      uncheckedBackgroundImage={`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="17" width="17" viewBox="0 0 23 25" ><path fill="${encodeURIComponent(
        `${theme.palette.primary.main}`
      )}" d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"></path></svg>')`}
      {...props}
    />
  );
};

export default memo(LanguageSwitch);
