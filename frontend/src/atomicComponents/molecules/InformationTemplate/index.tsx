import { ButtonProps, SxProps } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ReactNode } from "react";
import {
  StyledHeader,
  StyledImage,
  StyledNavLink,
  StyledWrapper,
} from "./styles";

export interface IActionNavButton extends ButtonProps {
  to: string;
}

interface Props {
  headerText?: string | ReactNode;
  imageSrc?: string;
  imageAlt: string;
  /** if true image will be displayed before header text */
  reversed?: boolean;
  headerStylesOverride?: SxProps;
  imageStylesOverride?: SxProps;
  /** if defined, navlink with button will be displayed at the bottom of the template */
  actionNavButton?: IActionNavButton;
  /** if defined, button will be displayed at the bottom of the template */
  actionButton?: ButtonProps; //
}

const InformationTemplate = ({
  headerText,
  imageSrc,
  imageAlt,
  reversed = false,
  headerStylesOverride,
  imageStylesOverride,
  actionNavButton,
  actionButton,
}: Props): JSX.Element => {
  return (
    <StyledWrapper reversed={reversed}>
      {headerText && (
        <StyledHeader sx={headerStylesOverride}>{headerText}</StyledHeader>
      )}
      {imageSrc && (
        <StyledImage src={imageSrc} alt={imageAlt} sx={imageStylesOverride} />
      )}
      {actionNavButton && (
        <StyledNavLink to={actionNavButton.to}>
          <Button {...actionNavButton} />
        </StyledNavLink>
      )}
      {actionButton && <Button {...actionButton} />}
    </StyledWrapper>
  );
};

export default InformationTemplate;
