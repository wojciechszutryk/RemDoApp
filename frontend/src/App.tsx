import PageTemplate from "atomicComponents/molecules/PageTemplate";
import { RequireAuthPageWrapper } from "atomicComponents/organisms/RequireAuthPageWrapper";
import { RequireShareTokenWrapper } from "atomicComponents/organisms/RequireShareTokenWrapper";
import useNotificationSocket from "framework/notifications/useNotificationSocket";

import { Pages } from "framework/routing/pages";
import "framework/translations/i18.config/resources";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import TempConsole from "pages/HomePage/components/_TempConsole/TempConsole";
import UserPage from "pages/UserPage";
import { lazy, Suspense, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("pages/HomePage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const RemindersPage = lazy(() => import("pages/RemindersPage"));
const TodoListsPage = lazy(() => import("pages/TodoListsPage"));
const SingleTodoListPage = lazy(() => import("pages/SingleTodoListPage"));
const ForgetPasswordPage = lazy(
  () => import("pages/SharedPages/ForgetPasswordPage")
);

const App = (): JSX.Element => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title = t(TranslationKeys.PageTitleMain);
    document.title = title;
  }, []);

  useNotificationSocket();

  return (
    <>
      <TempConsole />
      <HashRouter>
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
          >
            <Route path={Pages.CollaborantsPage.path} />
            <Route path={Pages.CollaborantsPage.Collaborant.path} />
          </Route>
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
            path={Pages.VerifyAccountPage.path()}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <RequireShareTokenWrapper>
                    <LoginPage showAccountVerifyPanel />
                  </RequireShareTokenWrapper>
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
                  <RequireAuthPageWrapper>
                    <UserPage />
                  </RequireAuthPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.RemindersPage.path()}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <RequireAuthPageWrapper>
                    <RemindersPage />
                  </RequireAuthPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.TodoListsPage.path}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <RequireAuthPageWrapper>
                    <TodoListsPage />
                  </RequireAuthPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.TaskPage.path()}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <RequireAuthPageWrapper>
                    <SingleTodoListPage />
                  </RequireAuthPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.TodoListPage.path()}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <RequireAuthPageWrapper>
                    <SingleTodoListPage />
                  </RequireAuthPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.SharedForgotPasswordPage.path()}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <RequireShareTokenWrapper>
                    <ForgetPasswordPage />
                  </RequireShareTokenWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.SharedTodoListPage.path()}
            element={
              <Suspense fallback={false}>
                <PageTemplate>
                  <RequireShareTokenWrapper>
                    <SingleTodoListPage disableListsNavigate />
                  </RequireShareTokenWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
