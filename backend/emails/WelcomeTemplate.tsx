import { Button, Link, Text } from "@react-email/components";
import React, { CSSProperties } from "react";
import EmailWrapper from "./EmailWrapper";

interface Props {
  name: string;
  isDarkTheme?: boolean;
}

const WelcomeTemplate = ({ name, isDarkTheme }: Props) => {
  return (
    <EmailWrapper name={name} isDarkTheme={isDarkTheme}>
      <Text className="font-bold text-3xl">Hello World {name}</Text>
      <Text className="font-bold text-3xl">hiii {name}</Text>
      <Button className="bg-slate-800 text-slate-50 p-10 rounded-md">
        Click
      </Button>
      <Link href="https://todoreact-deploy-z3nszrxrrq-ew.a.run.app/">
        https://todoreact-deploy-z3nszrxrrq-ew.a.run.app/
      </Link>
    </EmailWrapper>
  );
};

const body: CSSProperties = {
  background: "#fff",
};

const heading: CSSProperties = {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 20,
};

export default WelcomeTemplate;
