import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskIcon from "@mui/icons-material/Task";
import { SearchCategory } from "linked-models/search/search.model";

interface Props {
  searchCategory: SearchCategory;
}

const SearchResultIcon = ({ searchCategory }: Props): JSX.Element => {
  switch (searchCategory) {
    case SearchCategory.Reminder:
      return <CircleNotificationsIcon />;
    case SearchCategory.TodoList:
      return <FormatListBulletedIcon />;
    case SearchCategory.Task:
      return <TaskIcon />;
    default:
      return <></>;
  }
};

export default SearchResultIcon;
