import "./PicosPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PicosPage() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios
      .get("/api/pizza")
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Klaida gavus picų duomenis:", error);
      });
  }, []);

  const base64ToImageUrl = (base64String) => {
    return `data:image/*;base64,${base64String}`;
  };

  return (
    <div className="pizzas-container">
      <h1>Picos puslapis</h1>
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
              <p>Dydis: {pizza.pizzaSize}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PicosPage;
