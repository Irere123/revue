import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./app/routes";
import { AuthLayout } from "./components/layouts";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
