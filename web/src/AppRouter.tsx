import { BrowserRouter, Route, Routes } from "react-router";

import { AuthLayout, AppLayout } from "./components/layouts";
import { Providers } from "./app/providers";

import HomePage from "./app/routes";
import OnBoardingPage from "./app/routes/onboarding";
import DashboardPage from "./app/routes/dash";
import FocusLayout from "./components/layouts/focus-layout";
import ProfilePage from "./app/routes/profile";

const AppRouter = () => {
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
          <Route element={<FocusLayout />}>
            <Route path="u/:username" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default AppRouter;
