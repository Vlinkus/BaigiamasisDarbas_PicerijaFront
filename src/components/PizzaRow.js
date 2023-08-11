import React from 'react';
import { useTranslation } from "react-i18next";
import '../i18n';

function PizzaRow({ pizza, uniqueId, pizzaCount, setPizzaCount }) {
    const { t, i18n } = useTranslation();

    const changeLanguageHandler = (e) => {
        const languageValue = e.target.value
        i18n.changeLanguage(languageValue);
      }
  const handleDecrease = () => {
    if (pizzaCount > 1) {
      setPizzaCount(uniqueId, pizzaCount - 1);
    }
  };

  const handleIncrease = () => {
    setPizzaCount(uniqueId, pizzaCount + 1);
  };

  const base64ToImageUrl = (base64String) => {
    return `data:image/*;base64,${base64String}`;
  };

  return (
      <div key={pizza.id} className="col-4 pizza-item">
          {pizza.pizzaPhoto && (
              <img
                  src={base64ToImageUrl(pizza.pizzaPhoto)}
                  alt={pizza.pizzaName}
              />
          )}
          <div className="pizza-details">
              <h2>{pizza.pizzaName}</h2>
              <p>{t("Price")}: {pizza.pizzaPrice} €</p>
              <p>{t("Size")}: {pizza.pizzaSize} cm</p>
              <p>
                  {t("Ingredients")}:{" "}
                  {pizza.products
                      .map((product) => t(product.productName))
                      .join(", ")}
              </p>
              <div className="row cart">
                  <div className="col-3 col-sm-1 cart">
                      <button className="decreasePizzaCount" onClick={handleDecrease}>-</button>
                  </div>
                  <div className="col-3 col-sm-1 cart">
                      <input type="text" className="pizzaCountToAdd" value={pizzaCount} />
                  </div>
                  <div className="col-3 col-sm-1 cart">
                      <button className="increasePizzaCount" onClick={handleIncrease}>+</button>
                  </div>
                  <div className="col-3 col-sm-1 cart add_to_cart">
                      <button className="addToCart">Add</button>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default PizzaRow;
