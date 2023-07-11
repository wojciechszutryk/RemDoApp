import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import EventIcon from "@mui/icons-material/Event";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LuggageIcon from "@mui/icons-material/Luggage";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { memo } from "react";
import { StyledTodoListIconWrapper } from "./styles";

interface Props {
  type: TodoListIconEnum;
  disableHover?: boolean;
  onClick?: () => void;
}

const TodoListIcon = ({ type, onClick, disableHover }: Props): JSX.Element => {
  const getIcon = () => {
    switch (type) {
      case TodoListIconEnum.Child: {
        return <ChildFriendlyIcon onClick={onClick} />;
      }

      case TodoListIconEnum.House: {
        return <ApartmentIcon onClick={onClick} />;
      }

      case TodoListIconEnum.Family: {
        return <FamilyRestroomIcon onClick={onClick} />;
      }

      case TodoListIconEnum.Gym: {
        return <FitnessCenterIcon onClick={onClick} />;
      }

      case TodoListIconEnum.Travel: {
        return <LuggageIcon onClick={onClick} />;
      }

      case TodoListIconEnum.Food: {
        return <RestaurantIcon onClick={onClick} />;
      }

      case TodoListIconEnum.Education: {
        return <SchoolIcon onClick={onClick} />;
      }

      case TodoListIconEnum.Shopping: {
        return <ShoppingCartIcon onClick={onClick} />;
      }

      case TodoListIconEnum.Reminder: {
        return <EventIcon onClick={onClick} />;
      }

      default: {
        return <AssignmentIcon onClick={onClick} />;
      }
    }
  };

  return (
    <StyledTodoListIconWrapper disableHover={disableHover}>
      {getIcon()}
    </StyledTodoListIconWrapper>
  );
};

export default memo(TodoListIcon);
