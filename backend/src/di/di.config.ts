import { registerUserBindings } from "./register.user.bindings";
import { Container } from "inversify";

export const registerBindings = (container: Container) => {
  registerUserBindings(container);
};
