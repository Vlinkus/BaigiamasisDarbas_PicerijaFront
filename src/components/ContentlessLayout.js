import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function ContentlessLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
