import { BrowserRouter, Route, Routes } from "react-router";

import { AuthLayout, AppLayout } from "./components/layouts";

import HomePage from "./app/routes";
import OnBoardingPage from "./app/routes/onboarding";
import DashboardPage from "./app/routes/dash";
import { Providers } from "./app/providers";

export const AppRouter = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<HomePage />} />
            <Route path="onboarding" element={<OnBoardingPage />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="dash" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
};
