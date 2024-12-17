import { SearchCategory } from "linked-models/search/search.model";
import SearchResultsWrapper from "../SearchResultsWrapper";

interface TabPanelProps {
  children?: React.ReactNode;
  index: SearchCategory;
  value: SearchCategory;
}

const SearchTabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => {
  if (value !== index) {
    return null; // for framer-motion
  }

  return (
    <SearchResultsWrapper
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </SearchResultsWrapper>
  );
};

export default SearchTabPanel;
