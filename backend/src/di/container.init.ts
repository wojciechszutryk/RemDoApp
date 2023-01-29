import { Container } from "inversify";

export const container = new Container({
  defaultScope: "Request",
  autoBindInjectable: true,
});
