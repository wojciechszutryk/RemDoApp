import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "atomicComponents/atoms/Button";
import { TranslationKeys } from "framework/translations/translationKeys";
import { useTranslation } from "react-i18next";
import { Wrapper } from "./styles";

export const ButtonsSocial = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Button
        onClick={() => {
          console.error("ot implemented");
        }}
        variant={"outlined"}
      >
        <GoogleIcon />
        {t(TranslationKeys.GoogleSignIn)}
      </Button>
    </Wrapper>
  );
};
