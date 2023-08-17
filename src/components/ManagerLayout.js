import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function ManagerLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
