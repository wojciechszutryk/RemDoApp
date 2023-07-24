import { IconButton } from "@mui/material";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StyledIconPickerWrapper, StyledPopover } from "./styles";

const IconPicker = () => {
  const [iconPickerAnchorEl, setIconPickerAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const { setValue, getValues } = useFormContext();
  const handleClose = () => setIconPickerAnchorEl(null);

  return (
    <div>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setIconPickerAnchorEl(event.currentTarget);
        }}
      >
        <TodoListIcon type={getValues("icon")} />
      </IconButton>
      <StyledPopover
        open={Boolean(iconPickerAnchorEl)}
        anchorEl={iconPickerAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <StyledIconPickerWrapper>
          {Object.values(TodoListIconEnum).map((iconType) => {
            return (
              <TodoListIcon
                key={iconType}
                type={iconType}
                onClick={() => {
                  setValue("icon", iconType);
                  handleClose();
                }}
              />
            );
          })}
        </StyledIconPickerWrapper>
      </StyledPopover>
    </div>
  );
};

export default memo(IconPicker);
