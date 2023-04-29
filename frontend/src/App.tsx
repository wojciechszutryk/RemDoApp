import PageTemplate from "atomicComponents/molecules/PageTemplate";
import { ProtectedPageWrapper } from "atomicComponents/organisms/ProtectedPageWrapper";
import useAutoLogin from "framework/authentication/useAutoLogin";
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

  useAutoLogin();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={Pages.HomePage.path}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <HomePage />
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.LoginPage.path}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <LoginPage />
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.RegisterPage.path}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <LoginPage />
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.UserPage.path}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <ProtectedPageWrapper>
                    <UserPage />
                  </ProtectedPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.RemindersPage.path}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <ProtectedPageWrapper>
                    <RemindersPage />
                  </ProtectedPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.TodoListsPage.path}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <ProtectedPageWrapper>
                    <TodoListsPage />
                  </ProtectedPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
