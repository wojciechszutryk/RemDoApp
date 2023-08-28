import { motion } from "framer-motion";
import { memo } from "react";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
  key: string;
}

const TabWrapper = ({
  children,
  value,
  index,
  key,
  ...other
}: Props): JSX.Element => {
  return (
    <motion.div
      style={{ position: "absolute", top: "60px" }}
      key={key}
      initial={{ opacity: 0, translateX: index === 0 ? -300 : 300, zIndex: 0 }}
      exit={{
        opacity: 0,
        translateX: index === 0 ? 300 : -300,
        zIndex: 1,
      }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        role="tabpanel"
        style={{ width: 300, padding: 15 }}
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
