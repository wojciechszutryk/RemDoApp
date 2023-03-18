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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
