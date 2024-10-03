import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import TodoListPicker from "../TodoListPicker";

interface SearchBarProps {
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  todoListIds: string[];
  setTodoListIDs: (setTodoListIDs: string[]) => void;
}

const SearchBar = ({
  searchPhrase,
  setSearchPhrase,
  todoListIds,
  setTodoListIDs,
}: SearchBarProps): JSX.Element | null => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <TextField
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
      ref={inputRef}
      value={searchPhrase}
      InputProps={{
        startAdornment: (
          <SearchIcon
            sx={{
              width: "20px",
              marginRight: 2,
            }}
          />
        ),
        endAdornment: (
          <>
            <ClearIcon
              onClick={() => setSearchPhrase("")}
              sx={{
                cursor: "pointer",
                width: "18px",
              }}
            />
            <TodoListPicker
              todoListIds={todoListIds}
              setTodoListIds={setTodoListIDs}
            />
          </>
        ),
      }}
    />
  );
};

export default SearchBar;
