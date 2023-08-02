import "./PicosPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PicosPage() {
  const [pizzas, setPizzas] = useState([]);
  const [isPending, setPending] = useState(true);
  const [randomPizza, setRandomPizza] = useState(null);
  const [showRandomPizza, setShowRandomPizza] = useState(false);

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

  const chooseRandomPizza = () => {
    const randomIndex = Math.floor(Math.random() * pizzas.length);
    setRandomPizza(pizzas[randomIndex]);
    setShowRandomPizza(true);
  };

  return (
    <div className="pizzas-container">
      {isPending && <div>Loading...</div>}
      <h1>Menu</h1>
      <div className="pizzas-list">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-item">
            {pizza.pizzaPhoto && (
              <img
                src={base64ToImageUrl(pizza.pizzaPhoto)}
                alt={pizza.pizzaName}
              />
            )}
            <div className="pizza-details">
              <h2>{pizza.pizzaName}</h2>
              <p>Kaina: {pizza.pizzaPrice} €</p>
              <p>Dydis: {pizza.pizzaSize} cm</p>
            </div>
          </div>
        ))}
      </div>
      {showRandomPizza ? (
        <div className="random-pizza">
          <h2>{randomPizza.pizzaName}</h2>
          <img
            src={base64ToImageUrl(randomPizza.pizzaPhoto)}
            alt={randomPizza.pizzaName}
          />
        </div>
      ) : (
        <button className="random-button" onClick={chooseRandomPizza}>
          SUŽINOK DIENOS PICĄ
        </button>
      )}
    </div>
  );
}
