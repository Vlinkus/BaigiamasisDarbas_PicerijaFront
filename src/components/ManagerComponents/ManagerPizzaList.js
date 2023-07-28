import axios from "axios";
import { useEffect, useState } from "react";

function ManagerPizzaList() {
    const [pizzas, setPizzas] = useState([]);
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

    return (
        <>
            <h3>Picos</h3>
                <table class="table table-hover table-striped">
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
                                <img src={`data:image/jpeg;base64,${pizza.pizzaPhoto}`}
                                    alt={pizza.pizzaName} />
                            </td>
                            <td>{pizza.pizzaPrice} €</td>
                            <td>{pizza.pizzaSize}</td>
                            <td>{pizza.products}</td>
                            <td>
                                <button type="button" class="btn btn-warning">Update</button>
                                <button type="button" class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </>
    );
}
export default ManagerPizzaList;