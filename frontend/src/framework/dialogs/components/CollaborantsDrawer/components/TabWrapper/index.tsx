import { motion } from "framer-motion";
import { memo } from "react";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
  key: string;
  width: number;
}

const TabWrapper = ({
  width,
  children,
  value,
  index,
  key,
  ...other
}: Props): JSX.Element => {
  return (
    <motion.div
      style={{ position: "absolute" }}
      key={key}
      initial={{
        opacity: 0,
        translateX: index === 0 ? -1 * width : width,
        zIndex: 0,
      }}
      exit={{
        opacity: 0,
        translateX: index === 0 ? width : -1 * width,
        zIndex: 1,
      }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        role="tabpanel"
        style={{ width: `${width}px`, padding: "15px" }}
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
      >
        <div>{children}</div>
      </div>
    </motion.div>
  );
};

export default memo(TabWrapper);
