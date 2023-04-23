import PageTemplate from "atomicComponents/molecules/PageTemplate";
import { ProtectedPageWrapper } from "atomicComponents/organisms/ProtectedPageWrapper";
import { Pages } from "framework/routing/pages";
import "framework/translations/i18.config/resources";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import UserPage from "pages/UserPage";
import { lazy, Suspense, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("pages/HomePage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const RemindersPage = lazy(() => import("pages/RemindersPage"));
const TodoListsPage = lazy(() => import("pages/TodoListsPage"));

const App = (): JSX.Element => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title = t(TranslationKeys.PageTitleMain);
    document.title = title;
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={Pages.HomePage.path} element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <HomePage />
                </Suspense>
              }
            />
          </Route>
          <Route path={Pages.LoginPage.path} element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>
          <Route path={Pages.RegisterPage.path} element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>
          <Route path={Pages.UserPage.path} element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <ProtectedPageWrapper>
                    <UserPage />
                  </ProtectedPageWrapper>
                </Suspense>
              }
            />
          </Route>
          <Route path={Pages.RemindersPage.path} element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <ProtectedPageWrapper>
                    <RemindersPage />
                  </ProtectedPageWrapper>
                </Suspense>
              }
            />
          </Route>
          <Route path={Pages.TodoListsPage.path} element={<PageTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <ProtectedPageWrapper>
                    <TodoListsPage />
                  </ProtectedPageWrapper>
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
