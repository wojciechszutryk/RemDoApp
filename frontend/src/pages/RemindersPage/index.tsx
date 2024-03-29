import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTranslation } from "react-i18next";
import BigCallendar from "./components/Callendar";
import { StyledRemindersPageWrapper } from "./styles";

const RemindersPage = (): JSX.Element => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title = `${t(TranslationKeys.PageTitleMain)} - ${t(
      TranslationKeys.PageTitleReminders
    )}`;
    document.title = title;
  }, []);

  return (
    <StyledRemindersPageWrapper>
      <BigCallendar />
    </StyledRemindersPageWrapper>
  );
};

export default memo(RemindersPage);
