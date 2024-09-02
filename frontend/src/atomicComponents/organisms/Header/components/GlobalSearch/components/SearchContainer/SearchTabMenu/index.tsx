import EventIcon from "@mui/icons-material/Event";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Tabs } from "@mui/material";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import { useMemo } from "react";

import Tab from "atomicComponents/atoms/Tab";
import { useTranslation } from "react-i18next";

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
        value: "Reminders",
        text: t(TranslationKeys.PageTitleReminders),
        icon: <EventIcon />,
        resultsCount: currentResults?.[SearchCategory.Reminder].length || 0,
      },
      {
        value: "TodoLists",
        text: t(TranslationKeys.PageTitleTodoLists),
        icon: <FactCheckIcon />,
        resultsCount: currentResults?.[SearchCategory.TodoList].length || 0,
      },
      {
        value: "Tasks",
        text: t(TranslationKeys.Tasks),
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
    <Tabs value={value} onChange={handleChange}>
      {tabsList.map((t) => (
        <Tab key={t.value} label={t.text} value={t.value} icon={t.icon} />
      ))}
    </Tabs>
  );
};
