import "./PicosPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../TranslationComponents/i18n";
import PizzaRow from "./PizzaRow";
import Cart from "./Cart";
import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";

export default function PicosPage() {
  const [pizzas, setPizzas] = useState([]);
  const [isPending, setPending] = useState(true);
  const [randomPizzaIndex, setRandomPizzaIndex] = useState(null);
  const [showRandomPizza, setShowRandomPizza] = useState(false);
  const [cart, setCart] = useState([]);
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

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

  useEffect(() => {
  }, [cart]);

  const base64ToImageUrl = (base64String) => {
    return `data:image/*;base64,${base64String}`;
  };

  const clearCart = () => {
    setCart([]);
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

  const setPizzaCount = (uniqueId, count) => {
    setPizzaCounts((prevCounts) => ({ ...prevCounts, [uniqueId]: count }));
  };

  // Function to add a pizza to the cart
  const addPizzaToCart = (pizza, count) => {
    const existingPizzaIndex = cart.findIndex(
      (item) => item.pizzaName === pizza.pizzaName
    );
    if (existingPizzaIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingPizzaIndex) {
          return { ...item, count: item.count + count };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      const updatedPizza = { ...pizza, count };
      setCart((prevCart) => [...prevCart, updatedPizza]);
    }
  };

  const updatePizzaCountInCart = (pizzaId, newCount) => {
    if (newCount === 0) {
      const updatedCart = cart.filter((pizza) => pizza.id !== pizzaId);
      setCart(updatedCart);
    } else {
      const updatedCart = cart.map((pizza) => {
        if (pizza.id === pizzaId) {
          return { ...pizza, count: newCount };
        }
        return pizza;
      });
      setCart(updatedCart);
    }
  };

  return (
    <div className="row">
      <div className="col-9 mainPizzaContainer">
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
                  addPizzaToCart={addPizzaToCart}
                />
              ))}
          </div>
          {showRandomPizza ? (
            <div className="random-pizza">
              <h2>{pizzas[randomPizzaIndex].pizzaName}</h2>
              <img className="randomPizzaImage"
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
      <Cart
        cart={cart}
        updatePizzaCount={updatePizzaCountInCart}
        clearCart={clearCart}
      />
    </div>
  );
}
