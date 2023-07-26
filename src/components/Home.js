import ExampleComponent from "./ExampleComponent";

function Home(){
    return(
        <div className="App">
      {/* <header>
        <div className="top_mobile_header">
          <label>Pizzeriaa</label>
          
            <div className="login_icon"></div>
            <div className="cart_icon" ></div>
            <div className="help_icon" ></div>

        </div>
      </header> */}
      <div className="content_body" >
        <ExampleComponent />
      </div>
      <div className="bottom_footer">das</div>
    </div>
    );
}
export default Home;