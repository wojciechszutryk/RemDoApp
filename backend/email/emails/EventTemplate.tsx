import React from "react";
import EmailWrapper, { EmailProps } from "./EmailWrapper";

interface Props extends EmailProps {
  body: string;
  link: string | null;
  eventCreatorImg?: string;
}

const EventTemplate = ({ body, link, eventCreatorImg, ...rest }: Props) => {
  return <EmailWrapper {...rest}></EmailWrapper>;
};

export default EventTemplate;
