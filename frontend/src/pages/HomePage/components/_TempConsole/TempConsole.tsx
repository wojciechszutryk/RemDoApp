import { Console, Hook, Unhook } from "console-feed";
import { Message } from "console-feed/lib/definitions/Console";
import { useEffect, useState } from "react";

import axios from "axios";

const TempConsole = () => {
  const [logs, setLogs] = useState<Message[]>([]);

  // useEffect(() => {
  //   const axiosInterceptor = axios.interceptors.request.use((config) => {
  //     console.log("Request intercepted:", config);
  //     return config;
  //   });

  //   return () => {
  //     axios.interceptors.request.eject(axiosInterceptor);
  //   };
  // }, []);

  // // run once!
  // useEffect(() => {
  //   const hookedConsole = Hook(
  //     window.console,
  //     (log) => setLogs((currLogs) => [...currLogs, log]),
  //     false
  //   );
  //   return () => Unhook(hookedConsole);
  // }, []);

  return (
    <div
      style={{
        // marginTop: "100px",
        // height: "100vh",
        // overflow: "scroll",
      }}
    >
      {/* <Console logs={logs} variant="light" /> */}
    </div>
  );
};

export default TempConsole;
