import * as React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppbar from "./components/Appbar";

export default function App() {
  return (
    <>
      <ResponsiveAppbar />
      <Outlet />
    </>
  );
}
