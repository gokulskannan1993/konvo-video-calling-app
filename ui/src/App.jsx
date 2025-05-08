import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import FriendsPage from "./pages/FriendsPage.jsx";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isVerified = authUser?.isVerified;

  const { theme } = useThemeStore();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div data-theme={theme} className="h-screen">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isVerified ? (
              <Layout showSidebar>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isVerified ? (
              <Layout showSidebar>
                <FriendsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : isVerified ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/onboarding" />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              isVerified ? (
                <Layout showSidebar>
                  <NotificationPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isVerified ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isVerified ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" />
            ) : isVerified ? (
              <Navigate to="/" />
            ) : (
              <OnboardingPage />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
