import axios from "axios";
import { useEffect, useState } from "react";
import ManagerPizzaModal from "./ManagerPizzaModal";
import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";

function ManagerPizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

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
        console.error("Klaida ištrynant picą:" + { pizzaIdToDelete }, error);
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
  };

  const base64ToImageUrl = (base64String) => {
    return `data:image/*;base64,${base64String}`;
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => handleCreatNewPizza()}
      >
        {t("Add New Pizza")}
      </button>
      <h1>{t("Pizzas")}</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">{t("Line Number")}</th>
            <th scope="col">{t("Pizza Name")}</th>
            <th scope="col">{t("Pizza Picture")}</th>
            <th scope="col">{t("Unit Price")}</th>
            <th scope="col">{t("Pizza Size")}</th>
            <th scope="col">{t("Products")}</th>
            <th scope="col">{t("Actions")}</th>
            {/* public Pizza(String pizzaName, byte[] pizzaPhoto, double pizzaPrice, int pizzaSize, List<Product> products */}
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza, index) => (
            <tr key={pizza.id}>
              <th scope="row">{index + 1}</th>
              <td>{pizza.pizzaName}</td>
              <td>
                {pizza.pizzaPhoto && (
                  <img className="managerImages"
                    src={base64ToImageUrl(pizza.pizzaPhoto)}
                    alt={pizza.pizzaName}
                  />
                )}
              </td>
              <td>{pizza.pizzaPrice} €</td>
              <td>{pizza.pizzaSize}</td>
              <td>
                {pizza.products.map((product) => (
                  <p key={`${pizza.id}${product.id}`}>
                    {t(`${product.productName}`)}
                  </p>
                ))}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#SimpleModal"
                  onClick={() => handleUpdate(pizza)}
                >
                  {t("Update")}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(pizza.id)}
                >
                  {t("Delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ManagerPizzaModal
          showModal={showModal}
          closeModal={closeModal}
          pizza={selectedPizza}
        />
      )}
    </>
  );
}
export default ManagerPizzaList;
