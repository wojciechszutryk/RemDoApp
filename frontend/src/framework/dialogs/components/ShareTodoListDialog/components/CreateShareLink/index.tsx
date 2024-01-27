import DeleteIcon from "@mui/icons-material/Delete";
import {
  AccordionDetails,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { TodoListRole } from "linked-models/permissions/todoList.permissions.enum";
import { SyntheticEvent, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import CopyArea from "./components/CopyArea";
import { useCreateAccessLinkInTodoListMutation } from "./mutations/createAccessLinkInTodoList.mutation";
import { useDeleteAccessLinkInTodoListMutation } from "./mutations/deleteAccessLinkInTodoList.mutation";
import { useGetTodoListAccessLinksQuery } from "./queries/useGetTodoListAccessLinks.query";
import { StyledShareAccordion } from "./styles";

interface Props {
  todoListId: string;
}

const CreateShareLink = ({ todoListId }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isLoading, isFetched, data } =
    useGetTodoListAccessLinksQuery(todoListId);
  const createAccessLinkInTodoListMutation =
    useCreateAccessLinkInTodoListMutation(todoListId);

  const deleteAccessLinkInTodoListMutation =
    useDeleteAccessLinkInTodoListMutation(todoListId);

  const handleCreateLink = (role: TodoListRole) => () => {
    createAccessLinkInTodoListMutation.mutate(role);
  };

  const handleDeleteLink = (role: TodoListRole) => () => {
    deleteAccessLinkInTodoListMutation.mutate(role);
  };

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) =>
    (_: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Typography mb={3}>
        {t(TranslationKeys.CreateTodoShareLinkDescription)}
      </Typography>
      {Object.values(TodoListRole).map((role: TodoListRole) => {
        const link = data?.[role];
        return (
          <StyledShareAccordion
            expanded={expanded === role}
            onChange={handleChange(role)}
            key={role}
            summaryText={t(
              TranslationKeys[role as keyof typeof TranslationKeys]
            )}
          >
            <AccordionDetails>
              <Typography>
                {t(
                  TranslationKeys[
                    `${role}DESCRIPTION` as keyof typeof TranslationKeys
                  ]
                )}
              </Typography>
              {isLoading ? (
                <Skeleton />
              ) : isFetched && link ? (
                <CopyArea text={link}>
                  <IconButton
                    disabled={deleteAccessLinkInTodoListMutation.isLoading}
                  >
                    <DeleteIcon onClick={handleDeleteLink(role)} />
                  </IconButton>
                </CopyArea>
              ) : (
                <Button
                  onClick={handleCreateLink(role)}
                  disabled={createAccessLinkInTodoListMutation.isLoading}
                >
                  {t(TranslationKeys.CreateTodoAccessLink)}
                </Button>
              )}
            </AccordionDetails>
          </StyledShareAccordion>
        );
      })}
    </>
  );
};

export default memo(CreateShareLink);
