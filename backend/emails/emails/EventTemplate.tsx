// @ts-nocheck
import { Column, Hr, Img, Link, Row, Text } from "@react-email/components";
import React from "react";
import EmailWrapper, { EmailProps } from "./EmailWrapper";

interface Props extends EmailProps {
  body: string;
  name: string;
  link: string | null;
  eventCreatorImg?: string;
}

const translations = {
  hello: {
    en: "Hello",
    pl: "Cześć",
  },
  somethinhHappened: {
    en: "Something new happened in RemDo!",
    pl: "Coś nowego wydarzyło się w RemDo!",
  },
  checkInApp: {
    en: "Check it out in app",
    pl: "Sprawdź to w aplikacji",
  },
};

const EventTemplate = ({
  body,
  link,
  eventCreatorImg,
  language = "en",
  name,
  ...rest
}: Props) => {
  return (
    <EmailWrapper {...rest} language={language}>
      <Text
        className="text-xl text-center text-secondaryContrastText"
        key={name}
      >
        {translations.hello[language]} {name},
      </Text>
      <Text className="text-lg text-center text-infoMain" key={language}>
        {translations.somethinhHappened[language]}
      </Text>
      <Hr className="border-infoMain" />
      <Row>
        <Column>
          <Text className="text-lg text-center text-secondaryContrastText">
            {body}
          </Text>
        </Column>
        {eventCreatorImg && (
          <Column>
            <Img
              src={eventCreatorImg}
              width={90}
              height={90}
              alt="author"
              className="rounded-full mt-3 p-2 border-2 border-infoMain border-solid"
            />
          </Column>
        )}
      </Row>
      {link && (
        <Link
          href={link}
          className="border-2 border-infoMain border-solid text-secondaryContrastText p-2 rounded-xl mx-auto text-center block w-fit mt-3"
        >
          {translations.checkInApp[language]}
        </Link>
      )}
    </EmailWrapper>
  );
};

export default EventTemplate;
