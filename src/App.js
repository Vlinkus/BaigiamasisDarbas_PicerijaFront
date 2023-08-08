// import Header from "./components/Header";
// import Home from "./components/Home";
// import Footer from "./components/Footer";
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

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="picos" element={<PicosPage/>} />
        <Route path="manage/v1" element={<ManagerPage/>} />
        <Route path="/" element={<ExampleComponent/>} />

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
    
    // -------- OLDER VERSION --------
    // <Router>
    //   <Header />
    //   <div className="p_wrapper">
    //     <div className="p_content">
    //       <Routes>
    //         <Route path="/" element={<ExampleComponent />} />
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/register" element={<RegisterPage />} />
    //         <Route path="/picos" element={<PicosPage />} />
    //         {/* <Route path="/pica/:id" element={<PicoPage />} /> */}
    //         <Route path="/manage/v1" element={<ManagerPage />} />
    //         <Route path="/users" element={<Users />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </div>
    //   <Footer />
    // </Router>
  )
}