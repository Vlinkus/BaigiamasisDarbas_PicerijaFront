import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderPizzas, setSelectedOrderPizzas] = useState([]);
  const [allPizzas, setAllPizzas] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchAllPizzas();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Klaida gavus užsakymų duomenis:", error);
      });
  };

  const fetchAllPizzas = () => {
    axios
      .get("/api/pizza")
      .then((response) => {
        setAllPizzas(response.data);
      })
      .catch((error) => {
        console.error("Klaida gavus picų duomenis:", error);
      });
  };

  const handleDeleteClick = (orderId) => {
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

  const handleEditClick = (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    setSelectedOrderId(orderId);
    setSelectedOrderPizzas(selectedOrder.pizzas);
    setEditing(true);
  };

  const handleCloseEdit = () => {
    setSelectedOrderId(null);
    setSelectedOrderPizzas([]);
    setEditing(false);
  };

  const handleAddPizza = (pizzaId) => {
    const selectedPizza = allPizzas.find((pizza) => pizza.id === pizzaId);
    setSelectedOrderPizzas((prevPizzas) => [...prevPizzas, selectedPizza]);
  };

  const handleRemovePizza = (pizzaId) => {
    setSelectedOrderPizzas((prevPizzas) =>
      prevPizzas.filter((pizza) => pizza.id !== pizzaId)
    );
  };

  const handleSaveEdit = () => {
    const updatedOrder = {
      id: selectedOrderId,
      pizzas: selectedOrderPizzas,
    };
    axios
      .put("/api/order", updatedOrder)
      .then((response) => {
        console.log(response.data);
        fetchOrders();
        handleCloseEdit();
      })
      .catch((error) => {
        console.error("Klaida išsaugant redagavimus:", error);
      });
  };

  return (
    <div className="order-container">
      <h1>Užsakymai</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Užsakymo nr</th>
            <th>Picos pavadinimas</th>
            <th>Kaina</th> {/* New column for total price */}
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.pizzas.map((pizza, index) => (
              <tr key={order.id + pizza.id}>
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>{order.id}</td>
                ) : null}
                <td>{pizza.pizzaName}</td>
                {/* New column for total price */}
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>
                    {order.price.toFixed(2)} €
                  </td>
                ) : null}
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>
                    <button onClick={() => handleEditClick(order.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(order.id)}>
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedOrderId !== null && (
        <div className="edit-order-popup">
          <div className="edit-order-content">
            <div className="edit-order-header">
              <h2>Užsakymo redagavimas</h2>
              <button className="close-button" onClick={handleCloseEdit}>
                X
              </button>
            </div>
            <div className="pizza-list">
              {editing && (
                <table>
                  <thead>
                    <tr>
                      <th>Pavadinimas</th>
                      <th>Veiksmai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrderPizzas.map((pizza) => (
                      <tr key={pizza.id}>
                        <td>{pizza.pizzaName}</td>
                        <td>
                          <button onClick={() => handleRemovePizza(pizza.id)}>
                            -
                          </button>
                          <button onClick={() => handleAddPizza(pizza.id)}>
                            +
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <button onClick={handleSaveEdit}>Išsaugoti</button>
            <button onClick={handleCloseEdit}>Atšaukti</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
