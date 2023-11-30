import {
  Body,
  Container,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
} from "@react-email/components";
import React from "react";

interface Props {
  name: string;
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
            infoMain: "#3A383E",
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
            infoMain: "#F5F6F7",
            warningMain: "#e0b8cc",
          },
    },
  },
});

const EmailWrapper = ({
  name,
  children,
  isDarkTheme = false,
  preview,
}: Props) => {
  const tailwindConfig = getTailwindConfig(isDarkTheme);
  return (
    <Html>
      {preview && <Preview>{preview}</Preview>}
      <Tailwind config={tailwindConfig}>
        <Body className="bg-backgroundPaper flex gap-7 flex-col m-0">
          <Container
            className="bg-secondaryLight p-2 flex justify-center items-center m-0"
            style={{
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "50%",
              maxWidth: "unset",
            }}
          >
            <Link href="https://remdo.com.pl/">
              <Img
                src={
                  isDarkTheme
                    ? "https://cdn.glitch.global/c4c25277-594f-4cf3-82c3-33c4b81d7c43/logo-dark.png?v=1701341769224"
                    : "https://cdn.glitch.global/c4c25277-594f-4cf3-82c3-33c4b81d7c43/logo-light.png?v=1701341768763"
                }
                width={100}
                alt="logo"
              />
            </Link>
          </Container>
          <Container
            className="bg-secondaryLight flex justify-center items-center gap-2 min-h-max min-w-max"
            style={{
              borderRadius: "200px 210px 200px 155px",
            }}
          >
            {children}
          </Container>
          <Container>
            <Link href="https://remdo.com.pl/">remdo.com.pl</Link>
            <Link href="https://remdo.com.pl/">remdo.com.pl</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailWrapper;
