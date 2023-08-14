import React, { useState, useEffect } from "react";
import axios from "axios";

function ManagerOrdersList() {
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
        sortOrders(response.data);
      })
      .catch((error) => {
        console.error("Klaida gavus užsakymų duomenis:", error);
      });
  };
  const sortOrders = (ordersData) => {
    const sortedOrders = [];
    ordersData.forEach(order => {
      const updatedOrder = { id: order.id, price: order.price, pizzas: [] };
      const distinctPizzaNames = [...new Set(order.pizzas.map(pizza => pizza.pizzaName))];
      for (let i = 0; i < distinctPizzaNames.length; i++) {
        const pizza = order.pizzas.find(pizza => pizza.pizzaName === distinctPizzaNames[i]);
        const count = order.pizzas.filter(pizza => pizza.pizzaName === distinctPizzaNames[i]).length;
        updatedOrder.pizzas.push({pizza, count }); 
      } 
      sortedOrders.push(updatedOrder);
    })
    setOrders(sortedOrders);
    console.log(sortedOrders);
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
    <>
     <h1>Užsakymai</h1>
            <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">El.Nr.</th>
                            <th scope="col">Užsakymo nr</th>
                            <th scope="col">Picos pavadinimas</th>
                            <th scope="col">Kiekis</th>
                            <th scope="col">Kaina</th>
                            <th scope="col">Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
          {orders.map((order, orderIndex) =>
            order.pizzas.map((pizza, index) => (
              <tr key={`${order.id}_${pizza.pizza.id}`}>
                {index === 0 ? (
                <td rowSpan={order.pizzas.length}>{orderIndex+1}</td>
                ) : null}
                {index === 0 ? (
                  
                  <td rowSpan={order.pizzas.length}>{order.id}</td>
                ) : null}
                <td>{pizza.pizza.pizzaName}</td>
                <td>{pizza.count}</td>
                {/* New column for total price */}
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>
                    {order.price.toFixed(2)}€
                  </td>
                ) : null}
                {index === 0 ? (
                  <td rowSpan={order.pizzas.length}>
                    <button type="button" className="btn btn-warning"  > {/*onClick={() => handleUpdate(order)} */}
                                    Atnaujinti
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(order.id)} > 
                                    Ištrinti
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
    </>
  );
}

export default ManagerOrdersList;
