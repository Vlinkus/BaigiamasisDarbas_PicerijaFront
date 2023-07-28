import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "reactstrap";
import SimpleModal from "./SimpleModal";


function ManagerPizzaList() {
    const [pizzas, setPizzas] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
    
    const handleDelete = (pizzaIdToDelete) => {
        axios
          .delete(`/api/pizza/${pizzaIdToDelete}`)
          .then((response) => {
            // Ištrynus perkrauna sąrašą iš kart
            axios.get("/api/pizza").then((response) => {
              setPizzas(response.data);
            });
          })
          .catch((error) => {
            console.error("Klaida ištrynant picą:" +{pizzaIdToDelete}, error);
          });
      };

      const handleUpdate = (pizzaIdToUpdate) =>{
        setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };

    const base64ToImageUrl = (base64String) => {
        return `data:image/*;base64,${base64String}`;
      };

    return (
        <>
            <h3>Picos</h3>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">El.Nr.</th>
                            <th scope="col">Pavadinimas</th>
                            <th scope="col">Paveikslas</th>
                            <th scope="col">Kaina</th>
                            <th scope="col">Dydis</th>
                            <th scope="col">Produktai</th>
                            <th scope="col">Veiksmai</th>
                            {/* public Pizza(String pizzaName, byte[] pizzaPhoto, double pizzaPrice, int pizzaSize, List<Product> products */}
                        </tr>
                    </thead>
                    <tbody>
                       
                    {pizzas.map((pizza, index) => (
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{pizza.pizzaName}</td>
                            <td>
                              {pizza.pizzaPhoto && (
                                        <img src={base64ToImageUrl(pizza.pizzaPhoto)} alt={pizza.pizzaName} />
                                    )}
                            </td>
                            <td>{pizza.pizzaPrice} €</td>
                            <td>{pizza.pizzaSize}</td>
                            <td>{pizza.products.map((product) => (<p>{product.productName}</p>))}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onclick={()=>handleUpdate(pizza.id)}>
                                    Update
                                </button>
                                 {/* <SimpleModal showModal={showModal} closeModal={closeModal} /> */}
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(pizza.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </>
    );
}
export default ManagerPizzaList;