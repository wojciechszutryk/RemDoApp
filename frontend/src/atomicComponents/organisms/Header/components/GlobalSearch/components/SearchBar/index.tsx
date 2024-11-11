import { ClearOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({
  searchPhrase,
  setSearchPhrase,
}: SearchBarProps): JSX.Element | null => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  return (
    <TextField
      autoFocus
      sx={(theme) => ({
        width: "100%",
        "& fieldset": {
          border: "none",
        },
        "& > div > svg + div": {
          width: "unset",
        },
        "& svg": {
          color: theme.palette.primary.contrastText,
        },
      })}
      placeholder={t(TranslationKeys.Search)}
      onChange={(e) => setSearchPhrase(e.target.value)}
      value={searchPhrase}
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <SearchIcon
            sx={{
              width: "20px",
              marginRight: 2,
            }}
          />
        ),
        endAdornment: searchPhrase.length > 0 && (
          <>
            <ClearOutlined
              onClick={() => setSearchPhrase("")}
              sx={{
                cursor: "pointer",
                width: "18px",
              }}
            />
          </>
        ),
      }}
    />
  );
};

export default SearchBar;
