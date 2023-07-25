//import background from './pic/bg1.svg';
import ExampleComponent from './ExampleComponent';
import './App.css';
//<div style={{height:'48px',width:'auto',float: 'right'}}>
function App() {
  return (
    <div className="App">
      <header>
        <div className="top_mobile_header">
          <label>Pizzeriaa</label>
          
            <div className="login_icon"></div>
            <div className="cart_icon" ></div>
            <div className="help_icon" ></div>

        </div>
      </header>
      <div className="content_body" >
        <ExampleComponent />
      </div>
      <div className="bottom_footer">das</div>
    </div>
  );
}

export default App;
