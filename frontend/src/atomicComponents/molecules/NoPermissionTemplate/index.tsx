import { Button } from "atomicComponents/atoms/Button";
import LockImage from "atomicComponents/atoms/SVGImages/Lock";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useTranslation } from "react-i18next";
import {
  StyledHeader,
  StyledImageWrapper,
  StyledNavLink,
  StyledWrapper,
} from "./styles";

const NoPermissionTemplate = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <StyledWrapper>
      <StyledHeader>{t(TranslationKeys.NoAccess)}</StyledHeader>
      <StyledImageWrapper>
        <LockImage />
      </StyledImageWrapper>
      <StyledNavLink to={Pages.HomePage.path}>
        <Button>{t(TranslationKeys.PageTitleHome)}</Button>
      </StyledNavLink>
    </StyledWrapper>
  );
};

export default NoPermissionTemplate;
