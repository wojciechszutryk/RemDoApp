import PageTemplate from "atomicComponents/molecules/PageTemplate";
import { RequireAuthPageWrapper } from "atomicComponents/organisms/RequireAuthPageWrapper";
import useAutoLogin from "framework/authentication/useAutoLogin";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { useNotificationSocket } from "framework/socket/useNotificationSocket";
import "framework/translations/i18.config/resources";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { TaskCreatedEvent } from "linked-models/event/implementation/task.events";
import UserPage from "pages/UserPage";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("pages/HomePage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const RemindersPage = lazy(() => import("pages/RemindersPage"));
const TodoListsPage = lazy(() => import("pages/TodoListsPage"));

const App = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();

  useLayoutEffect(() => {
    const title = t(TranslationKeys.PageTitleMain);
    document.title = title;
  });

  const { socketReady, on, socket } = useNotificationSocket(currentUser);

  useEffect(() => {
    if (socketReady && currentUser && socket) {
      // on("something", (something: any) => {
      //   //TEST CODE -> TODO LATER!
      //   console.log("something", something);
      // });
      on(TaskCreatedEvent, (task) => {
        //TEST CODE -> TODO LATER!
        console.log("TaskCreated event received!", task);
      });
    }
  }, [socketReady, on, currentUser, socket]);

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
                  <RequireAuthPageWrapper>
                    <UserPage />
                  </RequireAuthPageWrapper>
                </PageTemplate>
              </Suspense>
            }
          />
          <Route
            path={Pages.RemindersPage.path}
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
