import EventIcon from "@mui/icons-material/Event";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TaskIcon from "@mui/icons-material/Task";
import { SearchCategory } from "linked-models/search/search.model";

interface Props {
  searchCategory: SearchCategory;
}

const SearchResultIcon = ({ searchCategory }: Props): JSX.Element => {
  switch (searchCategory) {
    case SearchCategory.Reminder:
      return <EventIcon />;
    case SearchCategory.TodoList:
      return <FactCheckIcon />;
    case SearchCategory.Task:
      return <TaskIcon />;
    default:
      return <></>;
  }
};

export default SearchResultIcon;
