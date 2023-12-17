import { Container, Link, Text } from "@react-email/components";
import React, { CSSProperties } from "react";
import EmailWrapper, { EmailProps } from "./EmailWrapper";

interface Props extends EmailProps {
  name: string;
}

const translations = {
  hello: {
    en: "Hello",
    pl: "Cześć",
  },
  welcomeText: {
    en: "Welcome to our app",
    pl: "Witaj w naszej aplikacji",
  },
  whatsNext: {
    en: "What's next?",
    pl: "Co dalej?",
  },
  createTodo: {
    en: "Create your first todo list and task",
    pl: "Stwórz swoją pierwszą listę zadań i zadanie",
  },
  toNeverForget: {
    en: "To never forget what you need to do",
    pl: "By nigdy nie zapomnieć co musisz zrobić",
  },
  createReminder: {
    en: "Create your first reminder",
    pl: "Stwórz swoje pierwsze przypomnienie",
  },
  toBeNotified: {
    en: "To be notified about important events",
    pl: "By być powiadamianym o ważnych wydarzeniach",
  },
  configureSettings: {
    en: "Check your settings",
    pl: "Sprawdź swoje ustawienia",
  },
  addCollaborators: {
    en: "Add collaborants",
    pl: "Dodaj współpracowników",
  },
  and: {
    en: "And",
    pl: "Oraz",
  },
};

const WelcomeTemplate = ({ name, language = "en", ...rest }: Props) => {
  return (
    <EmailWrapper {...rest}>
      <Text className="text-xl text-center">
        {translations.hello[language]} {name}
      </Text>
      <Text className="text-xl text-center">
        {translations.welcomeText[language]}!
      </Text>
      <Text className="text-lg text-center">
        {translations.whatsNext[language]}:
      </Text>
      <Link
        href="https://remdo.com.pl/#/todoLists"
        className="bg-primaryMain text-slate-50 p-2 rounded-xl mx-auto text-center block w-fit"
      >
        {translations.createTodo[language]}
      </Link>
      <Text className="text-center">
        ...{translations.toNeverForget[language]}:
      </Text>
      <Link
        href="https://remdo.com.pl/#/reminders"
        className="bg-primaryMain text-slate-50 p-2 rounded-xl mx-auto text-center block w-fit"
      >
        {translations.createReminder[language]}
      </Link>
      <Text className="text-center">
        ...{translations.toBeNotified[language]}:
      </Text>
      <Container
        className="border-solid border-2 border-primaryMain p-2"
        style={borderStyle}
      >
        <Text className="text-center italic text-lg m-0" key={"and"}>
          {translations.and[language]}...
        </Text>
        <Text className="text-center m-0" key={"configure"}>
          {translations.configureSettings[language]}
        </Text>
        <Text className="text-center m-0" key={"collaborant"}>
          {translations.addCollaborators[language]}
        </Text>
      </Container>
    </EmailWrapper>
  );
};

const borderStyle: CSSProperties = {
  borderTopRightRadius: "45px",
  borderTopLeftRadius: "50px",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "40px",
};

export default WelcomeTemplate;
