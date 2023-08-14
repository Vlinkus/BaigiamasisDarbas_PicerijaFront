import { useEffect, useState } from 'react';
import { useTranslationAndLanguageChange } from '../TranslationComponents/TranslationUtils';
import CartRow from './CartRow.js';
import axios from 'axios';

export default function Cart({cart, updatePizzaCount} ){
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
    const [showCart, setShowCart] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [order, setOrder] = useState([]);

    const toggleCartVisibility = () => {
        setShowCart(cart.length>0);
      };
      useEffect(() => {
        const sum = cart.reduce((total, pizza) => total + pizza.count * pizza.pizzaPrice, 0);
        setCartTotal(sum);
        toggleCartVisibility();
        preOrder();
      }, [cart]); 

     const preOrder = () => {
        const pizzas = cart.reduce((acc, pizza) => {
            for (let i = 0; i < pizza.count; i++) {
              acc.push(pizza);
            }
            return acc;
          }, []);
        const updatedOrder = {pizzas, cartTotal};
          setOrder(updatedOrder);
      };
    const handlerPizzaOrder = () => {
        axios
        .request({
          url: "http://localhost:3000/api/order",
          method: 'POST',
          data: order,
        })
        .then((response) => {
        console.log(response);
        })
        .catch((error) => {
          console.error("Klaida išsaugant picos pakeitimus", error);
        });
    }

    return(
        <div className="col-3 cartContainer">
            <div className="row cart">
                <div className="col-12 col-sm-6 cart_title"><h3>{t("yourcart")}</h3></div>
                {/* <!-- Force next columns to break to new line --> */}
                <div className="w-100"></div>
                {!showCart && (
                <div className="col-12 col-sm-6">{t("yourcartempty")}</div>
                )}
                {showCart && (
                <div className="col-12 col-sm-6">
                    {cart.map((pizza) => (
                        <CartRow 
                            key={pizza.id}
                            pizza={pizza}
                            updatePizzaCount={updatePizzaCount}
                             />
                    ))}
                    <div className="cart-complete">
                            <span>{t("total")}{cartTotal}</span><br/>
                            <button className="btn btn-dark placePizzaOrder" onClick={handlerPizzaOrder}>{t("OrderIt")}</button>
                    </div>
                </div>
                
                )}
            </div>
        </div>

    );
}