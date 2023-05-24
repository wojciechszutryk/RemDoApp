import { ButtonProps, SxProps } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { ReactNode } from "react";
import {
  StyledHeader,
  StyledImageWrapper,
  StyledNavLink,
  StyledWrapper,
} from "./styles";

export interface IActionNavButton extends ButtonProps {
  to: string;
}

interface Props {
  headerText?: string | ReactNode;
  image?: JSX.Element;
  /** if true image will be displayed before header text */
  reversed?: boolean;
  headerStylesOverride?: SxProps;
  imageStylesOverride?: SxProps;
  layoutStyleOverride?: SxProps;
  /** if defined, navlink with button will be displayed at the bottom of the template */
  actionNavButton?: IActionNavButton;
  /** if defined, button will be displayed at the bottom of the template */
  actionButton?: ButtonProps; //
}

const InformationTemplate = ({
  headerText,
  image,
  reversed = false,
  layoutStyleOverride,
  imageStylesOverride,
  headerStylesOverride,
  actionNavButton,
  actionButton,
}: Props): JSX.Element => {
  return (
    <StyledWrapper reversed={reversed} sx={layoutStyleOverride}>
      {headerText && (
        <StyledHeader sx={headerStylesOverride}>{headerText}</StyledHeader>
      )}
      {image && (
        <StyledImageWrapper sx={imageStylesOverride}>
          {image}
        </StyledImageWrapper>
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
