import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./components/AppNavBar";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ExampleComponent from "./components/ExampleComponent";
import PicosPage from "./PicosPage";
import "./PicosPage.css";
import ManagerPage from "./components/ManagerComponents/ManagerPage";

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="main">
        <Switch>
          <Route path="/" exact component={ExampleComponent} />
          <Route path="/picos" exact component={PicosPage} />
          <Route path="/manage/v1" exact component={ManagerPage} />
          <Route path="/*" exact component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
