import { Routes, Route  } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorized";
import ExampleComponent from "./components/ExampleComponent";
import PicosPage from "./components/PizzaComponents/PicosPage";
import ManagerPage from "./components/ManagerComponents/ManagerPage";
import ManagerLayout from "./components/ManagerLayout";
import RequireAuth from "./components/RequireAuth";
import Users from "./components/Users";
import PersistLogin from "./components/PersistLogin";
import "./components/PizzaComponents/PicosPage.css";
import PizzaCarousel from "./components/carousel/PizzaCarousel";


export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
          <Route path="/manage/" element={<ManagerLayout />}>
            <Route element={<RequireAuth allowedRoles={["ADMIN","MANAGER"]} />}> 
              <Route path="v1" element={<ManagerPage />} />
            </Route>
          </Route> 

          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Home/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
            <Route path="picos" element={<PicosPage/>} />
            <Route path="carousel" element={<PizzaCarousel/>} />

            {/* <Route path="manage/v1" element={<ManagerPage/>} /> */}
            <Route path="/e" element={<ExampleComponent/>} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={["USER","ADMIN","MANAGER"]} />}>
              <Route path="/users" element={<Users />} />
            </Route>
              {/* catch all */}
          <Route path="unauthorized" element={<Unauthorized/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Route>
    </Routes>
  );
}
