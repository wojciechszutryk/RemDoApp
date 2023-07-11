import { MotionValue } from "framer-motion";
import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { ContextProps } from "./useCurrentUser.models";

export const Context = createContext<BaseContextProps & ContextProps>({
  isPresent: false,
  dragStartPosition: null,
  x: new MotionValue(),
  initialized: false,
});
