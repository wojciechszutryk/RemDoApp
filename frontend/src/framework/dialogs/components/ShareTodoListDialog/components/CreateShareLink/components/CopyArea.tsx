import CopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { memo, useState } from "react";
import { StyledCopyArea } from "../styles";
import { useTranslation } from "react-i18next";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";

interface Props {
  text: string;
  children?: React.ReactNode;
}

const CopyArea = ({ text, children }: Props): JSX.Element => {
  const { t } = useTranslation();
  
  const handleCopyLink = (text: string) => () => {
    navigator.clipboard.writeText(text);
    handleOpen();
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <StyledCopyArea>
      <div>
        <Tooltip
          disableHoverListener
          disableFocusListener
          disableTouchListener
          title={t(TranslationKeys.Copied)}
          open={open}
        >
          <IconButton onClick={handleCopyLink(text)}>
            <CopyIcon />
          </IconButton>
        </Tooltip>
        <textarea value={text} disabled rows={2}></textarea>
      </div>
      {children}
    </StyledCopyArea>
  );
};

export default memo(CopyArea);
