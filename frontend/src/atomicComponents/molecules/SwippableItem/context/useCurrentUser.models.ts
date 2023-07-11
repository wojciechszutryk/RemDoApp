import { MotionValue } from "framer-motion";

export interface ContextProps {
  isPresent: boolean;
  dragStartPosition: number | null;
  x: MotionValue<number>;
}
