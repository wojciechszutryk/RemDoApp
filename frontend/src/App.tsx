import { Box } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { TextField } from "atomicComponents/atoms/InputText";
import PageTemplate from "atomicComponents/templates/PageTemplate";
import useSetInitialTheme from "framework/theme/useSetInitialTheme";
import "framework/translations/config";
import { TranslationKeys } from "framework/translations/translationKeys";
import HomePage from "pages/HomePage";
import { Suspense, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = (): JSX.Element => {
  useSetInitialTheme();

  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title = t(TranslationKeys.PageTitleMain);
    document.title = title;
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <HomePage />
                </Suspense>
              }
            />
          </Route>
          <Route path="/tests" element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                      width: "100vw",
                    }}
                  >
                    <Button>Jakis tekst</Button>
                    <TextField />
                  </Box>
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
