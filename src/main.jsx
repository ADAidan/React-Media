import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import theme from "./theme";
import Home from "./pages/Home";
import Feed from "./pages/Feed";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user update:current_user_metadata",
        }}
      >
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>
);
