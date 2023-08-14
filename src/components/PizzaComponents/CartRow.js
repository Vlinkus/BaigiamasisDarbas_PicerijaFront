import React from 'react';
import { useTranslation } from "react-i18next";
import '../TranslationComponents/i18n';

function CartRow({ pizza, updatePizzaCount  }) {
    const { t, i18n } = useTranslation();

  const handleDecrease = () => {
    if (pizza.count > 0) {
        const newCount = pizza.count - 1;
        updatePizzaCount(pizza.id, newCount);
      }
  };

  const handleIncrease = () => {
    const newCount = pizza.count + 1;
    updatePizzaCount(pizza.id, newCount);
  };

  return (
      <div key={pizza.id} className="col-4 pizza-cart-item">
          <div className="pizza-car-details">
              <h2>{pizza.pizzaName}</h2>
              <p>{t("Price")}: {pizza.pizzaPrice} €</p>
              
              <div className="row cart d-flex align-items-center">
                  <div className="col-3 col-sm-1 cart">
                      <button className="decreasePizzaCount" onClick={handleDecrease}>-</button>
                  </div>
                  <div className="col-3 col-sm-1 cart">
                      <input type="text" className="pizzaCountToAdd" value={pizza.count} onChange={(e) => updatePizzaCount(pizza.id, parseInt(e.target.value, 10))}/>
                  </div>
                  <div className="col-3 col-sm-1 cart">
                      <button className="increasePizzaCount" onClick={handleIncrease}>+</button>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default CartRow;
