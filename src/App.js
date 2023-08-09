import Home from "./components/Home";
import { useTranslation } from "react-i18next";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import ExampleComponent from "./components/ExampleComponent";
import PicosPage from "./PicosPage";
import "./PicosPage.css";
import ManagerPage from "./components/ManagerComponents/ManagerPage";
import Users from "./components/Users";
import { Routes, Route  } from "react-router-dom";
import Order from "./order";

// temporary
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

export default function App() {
  const { t, i18n } = useTranslation();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="picos" element={<PicosPage/>} />
        <Route path="order" element={<Order/>} />

        <Route path="manage/v1" element={<ManagerPage/>} />
        <Route path="/e" element={<ExampleComponent/>} />

        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
          {/* <Route path="/manage/v1" element={<ManagerPage />} /> */}
        {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}> */}
          {/* <Route path="editor" element={<Editor />} /> */}
        {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
          {/* <Route path="admin" element={<Admin />} /> */}
        {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}> */}
          {/* <Route path="lounge" element={<Lounge />} /> */}
        {/* </Route> */}

        {/* catch all */}
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  )
}
