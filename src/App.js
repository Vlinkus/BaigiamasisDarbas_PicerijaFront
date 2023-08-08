// import Header from "./components/Header";
import NotFound from "./components/NotFound";
//import Home from "./components/Home";
// import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ExampleComponent from "./components/ExampleComponent";
import PicosPage from "./PicosPage";
import "./PicosPage.css";
import ManagerPage from "./components/ManagerComponents/ManagerPage";
import Users from "./components/Users";
import { Routes, Route  } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    
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
  );
}

export default App;
