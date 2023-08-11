import "./PicosPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import './i18n';
import PizzaRow from "./components/PizzaRow";

export default function PicosPage() {
  const [pizzas, setPizzas] = useState([]);
  const [isPending, setPending] = useState(true);
  const [randomPizzaIndex, setRandomPizzaIndex] = useState(null);
  const [showRandomPizza, setShowRandomPizza] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [pizzaCounts, setPizzaCounts] = useState({});

  useEffect(() => {
    axios
      .get("/api/pizza")
      .then((response) => {
        setPizzas(response.data);
        setPending(false);
      })
      .catch((error) => {
        console.error("Klaida gavus picų duomenis:", error);
        setPending(false);
      });
  }, []);

  const base64ToImageUrl = (base64String) => {
    return `data:image/*;base64,${base64String}`;
  };

  useEffect(() => {
    if (pizzas.length > 0 && randomPizzaIndex === null) {
      const newRandomPizzaIndex = Math.floor(Math.random() * pizzas.length);
      setRandomPizzaIndex(newRandomPizzaIndex);
    }
  }, [pizzas, randomPizzaIndex]);

  const chooseRandomPizza = () => {
    const nonEmptyPizzas = pizzas.filter(
      (pizza) =>
        pizza.pizzaName &&
        pizza.pizzaPrice &&
        pizza.pizzaSize &&
        pizza.products &&
        pizza.pizzaPhoto &&
        pizza.products.length > 0
    );

    if (nonEmptyPizzas.length > 0) {
      const newRandomPizzaIndex = Math.floor(
        Math.random() * nonEmptyPizzas.length
      );
      setRandomPizzaIndex(newRandomPizzaIndex);
      setShowRandomPizza(true);
    } else {
      console.log("Nerasta tinkamų picų su visais reikiamais duomenimis.");
    }
  };

  const { t, i18n } = useTranslation();
  const changeLanguageHandler = (e) => {
      const languageValue = e.target.value
      i18n.changeLanguage(languageValue);
    }

  
  const addItemToCart = (item, count) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItemFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
  };
  
  const toggleCartVisibility = () => {
    if(cart.size()>0){
        setShowCart(true);
    }
  };

  const setPizzaCount = (uniqueId, count) => {
    setPizzaCounts((prevCounts) => ({ ...prevCounts, [uniqueId]: count }));
  };

  return (
    // <div className="container">
      <div className="row">
        <div className="col-9">
          <div className="pizzas-container">
            {isPending && <div>{t("loading")}</div>}
            <h1>{t("Pizzas")}</h1>
            <div className="pizzas-list">
              {pizzas
                .filter(
                  (pizza) =>
                    pizza.pizzaName &&
                    pizza.pizzaPrice &&
                    pizza.pizzaSize &&
                    pizza.products &&
                    pizza.pizzaPhoto &&
                    pizza.products.length > 0
                )
                .map((pizza) => (
                  <PizzaRow
                  key={pizza.id}
                  pizza={pizza}
                  uniqueId={pizza.id}
                  pizzaCount={pizzaCounts[pizza.id] || 1}
                  setPizzaCount={setPizzaCount}
                />
                  // <div key={pizza.id} className="col-4 pizza-item">
                  //   {pizza.pizzaPhoto && (
                  //     <img
                  //       src={base64ToImageUrl(pizza.pizzaPhoto)}
                  //       alt={pizza.pizzaName}
                  //     />
                  //   )}
                  //   <div className="pizza-details">
                  //     <h2>{pizza.pizzaName}</h2>
                  //     <p>{t("Price")}: {pizza.pizzaPrice} €</p>
                  //     <p>{t("Size")}: {pizza.pizzaSize} cm</p>
                  //     <p>
                  //       {t("Ingredients")}:{" "}
                  //       {pizza.products
                  //         .map((product) => t(product.productName))
                  //         .join(", ")}
                  //     </p>
                  //     <div className="row cart">
                  //         <div className="col-3 col-sm-1 cart">
                  //           <button className="decreasePizzaCount">-</button>
                  //         </div>
                  //         <div className="col-3 col-sm-1 cart">
                  //           <input type="text" className="pizzaCountToAdd" value="1" />
                  //           </div>
                  //         <div className="col-3 col-sm-1 cart"> 
                  //           <button className="increasePizzaCount">+</button>
                  //         </div>                            
                  //         <div className="col-3 col-sm-1 cart add_to_cart">
                  //         <button className="addToCart">Add</button>
                  //         </div>
                  //     </div>  
                  //   </div>
                  // </div>
                ))}
            </div>
            {showRandomPizza ? (
              <div className="random-pizza">
                <h2>{pizzas[randomPizzaIndex].pizzaName}</h2>
                <img
                  src={base64ToImageUrl(pizzas[randomPizzaIndex].pizzaPhoto)}
                  alt={pizzas[randomPizzaIndex].pizzaName}
                />
              </div>
            ) : (
              <button className="random-button" onClick={chooseRandomPizza}>
                {t("DayPizza")}
              </button>
            )}
          </div>
        </div>
        
        <div className="col-3 cartContainer">
          <div className="row cart">
            <div className="col-12 col-sm-6 cart_title">{t("yourcart")}</div>
            {/* <!-- Force next columns to break to new line --> */}
            <div className="w-100"></div>
            {!showCart && (
              <div className="col-12 col-sm-6">{t("yourcartempty")}</div>
            )}
            {showCart && (
              <div className="col-12 col-sm-6">
                {cart.map((pizza) => (
                  <div key={pizza.id} className="pizza-inCart">
                    <div className="col-12 col-sm-6">{pizza.pizzaName}</div>
                    <div className="w-100"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    // </div>
  );
}
