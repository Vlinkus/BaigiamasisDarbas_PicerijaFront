import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorized";
import PicosPage from "./components/PizzaComponents/PicosPage";
import ManagerPage from "./components/ManagerComponents/ManagerPage";
import ManagerLayout from "./components/ManagerLayout";
import RequireAuth from "./components/RequireAuth";

import PersistLogin from "./components/PersistLogin";
import "./components/PizzaComponents/PicosPage.css";

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/manage/" element={<ManagerLayout />}>
          <Route element={<RequireAuth allowedRoles={["ADMIN", "MANAGER"]} />}>
            <Route path="v1" element={<ManagerPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="picos" element={<PicosPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
