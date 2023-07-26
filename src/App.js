//import background from './pic/bg1.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/AppNavBar';
import Home from './components/Home';
//<div style={{height:'48px',width:'auto',float: 'right'}}>
function App() {
  return (
    <Router>
    <AppNavbar />
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/picos" exact component={Home} />
    </Switch>
  </Router>
    
  );
}

export default App;
