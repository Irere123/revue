import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./app/routes";
import { AuthLayout } from "./components/layouts";
import OnBoardingPage from "./app/routes/onboarding";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<HomePage />} />
          <Route path="onboarding" element={<OnBoardingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
