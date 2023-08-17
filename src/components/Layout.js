import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="p_wrapper">
        <div className="p_content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
