// @ts-nocheck
import { Container, Hr, Link, Text } from "@react-email/components";
import React, { CSSProperties } from "react";
import EmailWrapper, { EmailProps } from "./EmailWrapper";

interface Props extends EmailProps {
  name: string;
  verifyAccountLink?: string;
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
  verifyAccount: {
    en: "Before you start using our app, please verify your account, by clicking on the button below:",
    pl: "Zanim zaczniesz korzystać z naszej aplikacji, proszę zweryfikuj swoje konto, klikając w poniższy przycisk:",
  },
  verifyAccountLink: {
    en: "Verify account",
    pl: "Zweryfikuj konto",
  },
  afterVerifyYouWillBeAble: {
    en: "After verify you will be able to:",
    pl: "Po weryfikacji będziesz mógł:",
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

const WelcomeTemplate = ({
  name,
  verifyAccountLink,
  language = "en",
  ...rest
}: Props) => {
  return (
    <EmailWrapper {...rest}>
      <Text className="text-xl text-center text-infoMain">
        {translations.hello[language]} {name}
      </Text>
      <Text className="text-xl text-center">
        {translations.welcomeText[language]}!
      </Text>
      {verifyAccountLink ? (
        <>
          <Text className="text-lg text-center text-infoMain">
            {translations.verifyAccount[language]}
          </Text>
          <Link
            href={verifyAccountLink}
            className="border-2 border-infoMain border-solid text-secondaryContrastText p-2 rounded-xl mx-auto text-center block w-fit mt-3"
          >
            {translations.verifyAccountLink[language]}
          </Link>
          <Hr className="border-infoMain mt-6" />
          <Text className="text-lg text-center text-infoMain">
            {translations.afterVerifyYouWillBeAble[language]}
          </Text>
        </>
      ) : (
        <Text className="text-lg text-center">
          {translations.whatsNext[language]}:
        </Text>
      )}
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
        className="border-solid border-2 border-primaryMain p-2 w-60"
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
