import axios from "axios";
import { useEffect, useState } from "react";
import ManagerPizzaModal from "./ManagerPizzaModal";


function ManagerPizzaList() {
    const [pizzas, setPizzas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState(null);

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

      const handleUpdate = (pizzaToUpdate) => {
        setSelectedPizza(pizzaToUpdate); // Užkrauna pasirinktos picos būsena (useState)
        setShowModal(true);
      };
    
      const closeModal = () => {
        setSelectedPizza(null); // Uždarius  modal'ą ištrina pasirinktos picos būsena (useState)
        setShowModal(false);
        axios.get("/api/pizza").then((response) => {
          setPizzas(response.data);
        });
      };
    const handleCreatNewPizza = () => {
      setShowModal(true);
    }

    const base64ToImageUrl = (base64String) => {
        return `data:image/*;base64,${base64String}`;
      };

    return (
        <>
            <button type="button" className="btn btn-success" onClick={() => handleCreatNewPizza()}>
                Pridėti Naują Picą
            </button>
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
                        <tr key={pizza.id}>
                            <th scope="row">{index+1}</th>
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
                                <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#SimpleModal" onClick={()=>handleUpdate(pizza)}>
                                    Atnaujinti
                                </button> 
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(pizza.id)}>
                                    Ištrinti
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {showModal && (
                     <ManagerPizzaModal showModal={showModal} closeModal={closeModal} pizza={selectedPizza} />
                )}
        </>
    );
}
export default ManagerPizzaList;