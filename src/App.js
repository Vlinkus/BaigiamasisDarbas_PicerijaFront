import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
//import Home from "./components/Home";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ExampleComponent from "./components/ExampleComponent";
import PicosPage from "./PicosPage";
import "./PicosPage.css";
import ManagerPage from "./components/ManagerComponents/ManagerPage";


function App() {
  return (
    <Router>
      <Header />
      <div className="p_wrapper">
        <img
          className="main-bg"
          src="./components/Images/menuBackground.webp"
          alt=""
        />
        <div className="p_content">
          <Switch>
            <Route path="/" exact component={ExampleComponent} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/picos" exact component={PicosPage} />
            {/* <Route path="/pica/:id" exact component={PicoPage} /> */}
            <Route path="/manage/v1" exact component={ManagerPage} />
          <Route path="/*" exact component={NotFound} />
            
        </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
