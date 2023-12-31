import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import { HomePage } from "./components/Home/HomePage";
import OnboardingScanPage from "./components/Onboarding/OnboardingPage";
import BottomNavigationComponent from "./components/BottomNavigationComponent";
import SearchPage from "./components/search/SearchPage";
import RecipeDetails from "./components/RecipeDetails"

function App() {
  const addBottomNavigation = (element: React.ReactNode) => {
    return (
      <>
        <div className="pb-24">{element}</div>
        <BottomNavigationComponent />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: addBottomNavigation(<HomePage />),
    },
    {
      path: "/onboard",
      element: addBottomNavigation(<OnboardingScanPage />),
    },
    {
      path: "/search",
      element: addBottomNavigation(<SearchPage />),
    },
    {
      path: "/details",
      element: addBottomNavigation(<RecipeDetails />),
    },
  ]);

  return (
    <RecoilRoot>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </RecoilRoot>
  );
}

export default App;
