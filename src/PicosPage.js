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

  return (
    <div className="pizzas-container">
      <h1>Picos puslapis</h1>
      <div className="pizzas-list">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-item">
            <img
              src={`data:image/jpeg;base64,${pizza.pizzaPhoto}`}
              alt={pizza.pizzaName}
            />
            <h2>{pizza.pizzaName}</h2>
            <p>Kaina: {pizza.pizzaPrice} €</p>
            <p>Dydis: {pizza.pizzaSize}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PicosPage;
