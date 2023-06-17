import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import { HomePage } from "./components/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/yeet",
      element: <></>,
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
