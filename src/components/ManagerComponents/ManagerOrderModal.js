import axios from "axios";
import React from "react";
import { Button, Label, Input, Form, FormGroup } from "reactstrap";
import { useEffect, useState } from "react";
import { useTranslationAndLanguageChange } from '../TranslationComponents/TranslationUtils';

export default function ManagerOrderModal({ showModal, closeModal, order }) {
    const [orderToEdit, setOrderToEdit] = useState({
        id: order ? order.id : null,
        pizzas: order ? order.pizzas : [],
        price: order ? order.price : ""
    });
    const [orderToUpdate, setOrderToUpdate] = useState([]);
    const [updatedPrice, setUpdatedPrice] = useState(order.price);
    const [pizzaDb, setPizzaDb] = useState([]);
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
    const orderModalClassName = showModal
        ? "modal display-block"
        : "modal display-none";

    useEffect(() => {
        axios
            .get("/api/pizza")
            .then((response) => {
                setPizzaDb(response.data);
            })
            .catch((error) => {
                console.error("Klaida gavus picų duomenis:", error);
            });
    }, []);

    useEffect(() => {
        preOrder();
        calculateChangedOrderPrice();

    }, [orderToEdit]);

    const handlePizzaCheck = (pizza, isChecked) => {
        const updatedPizza = { pizza, count: 1 };
        if (isChecked) {
            const updatedPizza = { pizza, count: 1 };
            setOrderToEdit((prevOrder) => ({
                ...prevOrder,
                pizzas: [...prevOrder.pizzas, updatedPizza],
            }));
        } else {
            setOrderToEdit((prevOrder) => ({
                ...prevOrder,
                pizzas: prevOrder.pizzas.filter(
                    (pizzaOrder) => pizzaOrder.pizza.id !== pizza.id
                ),
            }));
        }
    };

    const preOrder = () => {
        const pizzas = orderToEdit.pizzas.reduce((acc, pizza) => {
            for (let i = 0; i < pizza.count; i++) {
                acc.push(pizza.pizza);
            }
            return acc;
        }, []);
        const updatedOrder = { id: orderToEdit.id, pizzas: pizzas, price: orderToEdit.price };
        setOrderToUpdate(updatedOrder);
    };


    const handleSubmit = () => {
        axios
            .put("/api/order", orderToUpdate)
            .then((response) => {
                closeModal();
            })
            .catch((error) => {
                console.error("Klaida išsaugant redagavimus:", error);
            });
    }

    const handleDecrease = (pizza) => {
        if (pizza.count > 0) {
            const newCount = pizza.count - 1;
            updatePizzaCountInOrder(pizza.pizza.id, newCount);
        }
    };

    const handleIncrease = (pizza) => {
        const newCount = pizza.count + 1;
        updatePizzaCountInOrder(pizza.pizza.id, newCount);
    };

    const calculateChangedOrderPrice = () => {
        const sum = orderToEdit.pizzas.reduce((total, pizza) => total + pizza.count * pizza.pizza.pizzaPrice, 0);
        setUpdatedPrice(Math.floor(sum * 100) / 100);
    }

    const updatePizzaCountInOrder = (pizzaId, newCount) => {
        if (newCount === 0) {
            const updatedOrder = orderToEdit.pizzas.filter(pizza => pizza.pizza.id !== pizzaId);
            calculateChangedOrderPrice();
            setOrderToEdit(prevOrder => ({ ...prevOrder, pizzas: updatedOrder, price: updatedPrice }));
        } else {
            const updatedOrder = orderToEdit.pizzas.map(pizza => {
                if (pizza.pizza.id === pizzaId) {
                    calculateChangedOrderPrice();
                    return { ...pizza, count: newCount, price: updatedPrice };
                }
                return pizza;
            });
            setOrderToEdit(prevOrder => ({ ...prevOrder, pizzas: updatedOrder }));
        }
    };

    return (
        <>

            <div
                className={orderModalClassName}
                id="orderModal"
                tabIndex="-1"
                aria-labelledby="orderModalLabel"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id=" orderModalLabel">
                                {orderToEdit ? <> {t("Updating order")} {orderToEdit.id} </> : t("Updating order")}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <Form>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup>
                                            <Label htmlFor=" orderNumber">{t("Order No")}:{orderToEdit.id}</Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor=" orderPrice">{t("Order Pirce")}:{updatedPrice} €</Label>
                                            <p></p>
                                        </FormGroup>
                                        <FormGroup>
                                            <h4 htmlFor=" orderSize">{t("Pizzas")}</h4>
                                            {orderToEdit.pizzas.map((pizza) => (
                                                <div className="row" key={`${orderToEdit.id}_${pizza.pizza.id}`}>
                                                    <div className="col">
                                                        {pizza.pizza.pizzaName}
                                                    </div>
                                                    <div className="col order-12">
                                                        <div className="row cart-align-items-center">
                                                            <div className="col cart-row-buttons">
                                                                <button className="decreasePizzaCountInOrder" onClick={() => handleDecrease(pizza)}>-</button>
                                                            </div>
                                                            <div className="col cart-row-buttons">
                                                                <input type="text" className="pizzaCountInOrder" value={pizza.count} onChange={(e) => updatePizzaCountInOrder(pizza.pizza.id, parseInt(e.target.value, 10))} />
                                                            </div>
                                                            <div className="col cart-row-buttons">
                                                                <button className="increasePizzaCountInOrder" onClick={() => handleIncrease(pizza)}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup>
                                            <h4 htmlFor="orderPizzas">{t("Pizzas")}</h4>
                                            {pizzaDb.map((pizza) => (
                                                <div className="form-check" key={'p' + pizza.id}>
                                                    <Input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={pizza.id}
                                                        id={`pizzaCheckbox_${pizza.id}`}
                                                        checked={orderToEdit.pizzas.some(
                                                            (p) => p.pizza.id === pizza.id
                                                        )}
                                                        onChange={(event) => {
                                                            const { value, checked } = event.target;
                                                            handlePizzaCheck(pizza, checked);
                                                        }}
                                                    />
                                                    <Label className="form-check-label" htmlFor={`pizzaCheckbox_${pizza.id}`} >
                                                        {pizza && pizza.pizzaName ? t(pizza.pizzaName) : ''}
                                                    </Label>
                                                </div>
                                            ))}
                                        </FormGroup>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >
                                {t("Submit")}
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={closeModal}
                            >
                                {t("Cancel")}
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}