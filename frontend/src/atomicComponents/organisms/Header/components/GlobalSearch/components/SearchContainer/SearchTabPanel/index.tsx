import { motion } from "framer-motion";
import { SearchCategory } from "linked-models/search/search.model";

interface TabPanelProps {
  children?: React.ReactNode;
  index: SearchCategory;
  value: SearchCategory;
}

const parent = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
    <motion.div
      variants={parent}
      initial="hidden"
      animate="show"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </motion.div>
  );
};

export default SearchTabPanel;
