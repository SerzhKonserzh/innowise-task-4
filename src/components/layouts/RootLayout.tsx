import { Outlet } from "@tanstack/react-router";
import Header from "../ui/Header";

export const RootLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
)