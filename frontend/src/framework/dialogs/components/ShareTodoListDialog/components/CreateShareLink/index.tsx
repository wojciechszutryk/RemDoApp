import { Typography } from "@mui/material";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { TodoListRole } from "linked-models/permissions/todoList.permissions.enum";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const CreateShareLink = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography>
        {t(TranslationKeys.CreateTodoShareLinkDescription)}
      </Typography>
      {Object.values(TodoListRole).map((role) => (
        <div key={role}>
          <Typography>
            {t(TranslationKeys[role as keyof typeof TranslationKeys])}
          </Typography>
          link delete ikon
        </div>
      ))}
    </div>
  );
};

export default memo(CreateShareLink);
