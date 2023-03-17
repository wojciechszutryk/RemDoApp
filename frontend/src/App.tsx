import PageTemplate from "atomicComponents/templates/PageTemplate";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSetInitialTheme from "theme/useSetInitialTheme";

const App = (): JSX.Element => {
  useSetInitialTheme();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageTemplate />}>
            <Route
              path="*"
              element={
                <Suspense fallback={false}>
                  <></>
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
