import EventIcon from "@mui/icons-material/Event";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { StyledTab, StyledTabs } from "./styles";

interface Props {
  value: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  currentResults: ISearchResults | undefined;
}

export const SearchTabList = ({
  value,
  setActiveTab,
  currentResults,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const tabsList = useMemo(
    () => [
      {
        value: 0,
        text: `${t(TranslationKeys.PageTitleReminders)} ${
          currentResults?.[SearchCategory.Reminder].length || 0
        }`,
        icon: <EventIcon />,
      },
      {
        value: 1,
        text: `${t(TranslationKeys.PageTitleTodoLists)} ${
          currentResults?.[SearchCategory.TodoList].length || 0
        }`,
        icon: <FactCheckIcon />,
      },
      {
        value: 2,
        text: `${t(TranslationKeys.Tasks)} ${
          currentResults?.[SearchCategory.Task].length || 0
        }`,
        icon: <PlayCircleOutlineIcon />,
        resultsCount: currentResults?.[SearchCategory.Task].length || 0,
      },
    ],
    [currentResults, t]
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <StyledTabs value={value} onChange={handleChange}>
      {tabsList.map((t) => (
        <StyledTab key={t.value} label={t.text} value={t.value} icon={t.icon} />
      ))}
    </StyledTabs>
  );
};
