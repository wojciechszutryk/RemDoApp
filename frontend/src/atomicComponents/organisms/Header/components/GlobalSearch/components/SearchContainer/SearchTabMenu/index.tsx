import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import { useMemo } from "react";

import { useTranslation } from "react-i18next";
import SearchResultIcon from "../SearchResultIcon";
import { StyledTab, StyledTabs } from "./styles";

interface Props {
  value: SearchCategory;
  setActiveTab: React.Dispatch<React.SetStateAction<SearchCategory>>;
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
        value: SearchCategory.Reminder,
        text: `${t(TranslationKeys.PageTitleReminders)} ${
          currentResults?.[SearchCategory.Reminder]?.length || 0
        }`,
        icon: <SearchResultIcon searchCategory={SearchCategory.Reminder} />,
        disabled: !currentResults?.[SearchCategory.Reminder]?.length,
      },
      {
        value: SearchCategory.TodoList,
        text: `${t(TranslationKeys.PageTitleTodoLists)} ${
          currentResults?.[SearchCategory.TodoList]?.length || 0
        }`,
        icon: <SearchResultIcon searchCategory={SearchCategory.TodoList} />,
        disabled: !currentResults?.[SearchCategory.TodoList]?.length,
      },
      {
        value: SearchCategory.Task,
        text: `${t(TranslationKeys.Tasks)} ${
          currentResults?.[SearchCategory.Task]?.length || 0
        }`,
        icon: <SearchResultIcon searchCategory={SearchCategory.Task} />,
        disabled: !currentResults?.[SearchCategory.Task]?.length,
      },
    ],
    [currentResults, t]
  );

  const handleChange = (_: React.SyntheticEvent, newValue: SearchCategory) => {
    setActiveTab(newValue);
  };

  return (
    <StyledTabs value={value} onChange={handleChange}>
      {tabsList.map((t) => (
        <StyledTab
          key={t.value}
          label={t.text}
          value={t.value}
          icon={t.icon}
          disabled={t.disabled}
        />
      ))}
    </StyledTabs>
  );
};
