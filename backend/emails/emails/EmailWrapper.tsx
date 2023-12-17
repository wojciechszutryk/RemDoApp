import {
  Body,
  Column,
  Container,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
} from "@react-email/components";
import React from "react";

export interface EmailProps {
  unsubToken: string;
  userId: string;
  language?: "pl" | "en";
  isDarkTheme?: boolean;
  children?: React.ReactNode;
  preview?: string;
}

const getTailwindConfig = (isDark: boolean) => ({
  theme: {
    extend: {
      colors: isDark
        ? {
            primaryLight: "#433E49",
            primaryMain: "#827480",
            primaryDark: "#DBC1AD",
            primaryContrastText: "#DBC1AD",
            secondaryLight: "#928490",
            secondaryMain: "#928490",
            secondaryDark: "#c2b6b9",
            secondaryContrastText: "#DBC1AD",
            backgroundPaper: "#322f35",
            infoMain: "#cfba8e",
            warningMain: "#ad4a63",
          }
        : {
            primaryLight: "#ebeff0",
            primaryMain: "#95a7b0",
            primaryDark: "#88959b",
            primaryContrastText: "#3f606e",
            secondaryLight: "#517a8c",
            secondaryMain: "#3f606f",
            secondaryDark: "#9bb8c4",
            secondaryContrastText: "#ffffff",
            backgroundPaper: "#fefefe",
            infoMain: "#c3dbe6",
            warningMain: "#e0b8cc",
          },
    },
  },
});

const translations = {
  unsubscribe: {
    en: "unsubscribe",
    pl: "wypisz się",
  },
};

const EmailWrapper = ({
  children,
  isDarkTheme = false,
  language = "en",
  preview,
  userId,
  unsubToken,
}: EmailProps) => {
  const tailwindConfig = getTailwindConfig(isDarkTheme);
  return (
    <Html>
      {preview && <Preview>{preview}</Preview>}
      <Tailwind config={tailwindConfig}>
        <Body className="m-0 bg-backgroundPaper">
          <Section>
            <Row className="mb-10" key={"header"}>
              <Column
                className="bg-secondaryLight p-2 "
                style={{
                  borderBottomRightRadius: "50%",
                  borderBottomLeftRadius: "50%",
                  maxWidth: "unset",
                }}
              >
                <Link
                  href="https://remdo.com.pl/"
                  className="w-25 block m-auto"
                >
                  <Img
                    src={
                      isDarkTheme
                        ? "https://cdn.glitch.global/c4c25277-594f-4cf3-82c3-33c4b81d7c43/logo-dark.png?v=1701341769224"
                        : "https://cdn.glitch.global/c4c25277-594f-4cf3-82c3-33c4b81d7c43/logo-light.png?v=1701341768763"
                    }
                    width={100}
                    alt="logo"
                    className="m-auto"
                  />
                </Link>
              </Column>
            </Row>
            <Row
              className="bg-secondaryLight min-h-max p-12 text-secondaryContrastText font-sans mb-10 mx-auto max-w-xl"
              style={{
                borderRadius: "200px 210px 200px 155px",
              }}
              key={"main"}
            >
              <Column>{children}</Column>
            </Row>
            <Row className="w-min text-center mb-15" key={"footer"}>
              <Column>
                <Container key={"remdo"}>
                  <Link
                    href="https://remdo.com.pl/"
                    className="mx-auto my-2 text-secondaryLight font-sans text-center"
                  >
                    remdo.com.pl
                  </Link>
                </Container>
                <Container key={"unsub"}>
                  <Link
                    href={`https://todoreact-deploy-z3nszrxrrq-ew.a.run.app/users/${userId}/email/unsubscribe/${unsubToken}`}
                    className="mx-auto my-2 text-secondaryLight font-sans text-center"
                  >
                    {translations.unsubscribe[language]}
                  </Link>
                </Container>
              </Column>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailWrapper;
