import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslationAndLanguageChange } from '../TranslationComponents/TranslationUtils';
import ManagerOrderModal from "./ManagerOrderModal";


function ManagerOrdersList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedOrderPizzas, setSelectedOrderPizzas] = useState([]);
  const [editing, setEditing] = useState(false);
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/api/orders")
      .then((response) => {
        sortOrders(response.data);
      })
      .catch((error) => {
        console.error("Klaida gavus užsakymų duomenis:", error);
      });
  };

  const sortOrders = (ordersData) => {
    const sortedOrders = [];
    ordersData.forEach((order) => {
      const updatedOrder = { id: order.id, price: order.price, pizzas: [] };
      const distinctPizzaNames = [
        ...new Set(order.pizzas.map((pizza) => pizza.pizzaName))
      ];
      for (let i = 0; i < distinctPizzaNames.length; i++) {
        const pizza = order.pizzas.find(
          (pizza) => pizza.pizzaName === distinctPizzaNames[i]
        );
        const count = order.pizzas.filter(
          (pizza) => pizza.pizzaName === distinctPizzaNames[i]
        ).length;
        updatedOrder.pizzas.push({ pizza, count });
      }
      sortedOrders.push(updatedOrder);
    });
    setOrders(sortedOrders);
  };

  const handleDelete = (orderId) => {
    axios
      .delete(`/api/order/${orderId}`)
      .then((response) => {
        console.log(response.data);
        fetchOrders();
      })
      .catch((error) => {
        console.error("Klaida ištrinant užsakymą:", error);
      });
  };

  const handleOrderUpdate = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
    axios.get("/api/orders").then((response) => {
      sortOrders(response.data);
    });
  };

  return (
    <>
      <h1>{t("Orders")}</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">{t("Line Number")}</th>
            <th scope="col">{t("Order No")}</th>
            <th scope="col">{t("Pizza Name")}</th>
            <th scope="col">{t("Pizza count")}</th>
            <th scope="col">{t("Unit Price")}</th>
            <th scope="col">{t("Total Price")}</th>
            <th scope="col">{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, orderIndex) =>
            order.pizzas.map((pizza, index) => (
              <tr key={`${order.id}_${pizza.pizza.id}`}>
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>{orderIndex + 1}</td>
                ) : null}
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>{order.id}</td>
                ) : null}
                <td>{pizza.pizza.pizzaName}</td>
                <td>{pizza.count}</td>
                <td>{pizza.pizza.pizzaPrice}</td>
                {/* New column for total price */}
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>
                    {order.price.toFixed(2)}€
                  </td>
                ) : null}
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>
                    <button type="button" className="btn btn-warning" onClick={() => handleOrderUpdate(order)} >
                      {t("Update")}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(order.id)} >
                      {t("Delete")}
                    </button>
                  </td>
                ) : null}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showModal && (
                     <ManagerOrderModal showModal={showModal} closeModal={closeModal} order={selectedOrder} />
                )}        
    </>
  );
}

export default ManagerOrdersList;
