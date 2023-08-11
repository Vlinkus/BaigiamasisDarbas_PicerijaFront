import "./Home.css";
import front from "./Images/front.jpg";
import PizzaCarousel from "./carousel/PizzaCarousel";

export default function Home() {
  return (
    <div className="container-front">
      <div className="row">
        <div className="col-6">
          <h1>
            Authentic Italian cuisine. Creative dishes to choose from. All from our
            stone oven, all organic, all delicious.
          </h1>
        </div>
        <div className="col-6 carousel"><PizzaCarousel/></div>
        <div className="w-100"></div>
        <div className="col-7 firstImage"><img src={front} alt="pizzeria_Image" /></div>
        <div className="col-2">Column3</div>
      </div>
    </div>
    
  );
}
