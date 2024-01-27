// @ts-nocheck
import { Link, Text } from "@react-email/components";
import React from "react";
import EmailWrapper, { EmailProps } from "./EmailWrapper";

interface Props extends EmailProps {
  link: string;
}

const translations = {
  forgotPasswordWasRequested: {
    en: "Password change was requested.",
    pl: "Zgłoszono prośbę o zmianę hasła.",
  },
  body: {
    en: "If you didn't request password change, please ignore this email. To reset your password, click the link below. (This link is valid for 24 hours.)",
    pl: "Jeśli nie prosiłeś o zmianę hasła, zignoruj tę wiadomość. Aby zresetować hasło, kliknij poniższy link. (Link jest ważny przez 24 godziny.)",
  },
  buttonText: {
    en: "Change password",
    pl: "Zmień hasło",
  },
  regards: {
    en: "Regards, RemDo Team",
    pl: "Pozdrawiamy, Zespół RemDo",
  },
};

const ForgetPasswordTemplate = ({
  link = "www.cm",
  language = "en",
  ...rest
}: Props) => {
  return (
    <EmailWrapper {...rest} language={language}>
      <Text className="text-xl text-center text-secondaryContrastText">
        {translations.forgotPasswordWasRequested[language]}
      </Text>
      <Text className="text-lg text-center text-infoMain">
        {translations.body[language]}
      </Text>
      <Link
        href={link}
        className="border-2 border-infoMain border-solid text-secondaryContrastText p-2 rounded-xl mx-auto text-center block w-fit mt-3"
      >
        {translations.buttonText[language]}
      </Link>
      <Text className="text-md text-center text-secondaryContrastText italic">
        {translations.regards[language]}
      </Text>
    </EmailWrapper>
  );
};

export default ForgetPasswordTemplate;
