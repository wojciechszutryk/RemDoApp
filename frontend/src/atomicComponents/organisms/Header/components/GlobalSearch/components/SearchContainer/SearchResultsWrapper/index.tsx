import { HTMLMotionProps, motion } from "framer-motion";
import { memo } from "react";

const parent = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface Props extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
}

const SearchResultsWrapper = ({ children, ...rest }: Props): JSX.Element => {
  return (
    <motion.div variants={parent} initial="hidden" animate="show" {...rest}>
      {children}
    </motion.div>
  );
};

export default memo(SearchResultsWrapper);
