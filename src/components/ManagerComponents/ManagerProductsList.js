import axios from "axios";
import { useEffect, useState } from "react";

function ManagerProductsList(){
    const [products, setProduct] = useState([]);
    useEffect(() => {
      axios
        .get("/api/products")
        .then((response) => {
            setProduct(response.data);
        })
        .catch((error) => {
          console.error("Klaida gavus produktų duomenis:", error);
        });
    }, []);
    return(
        <>
            <h2>Produktų sąrašas</h2>
            <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">El.Nr.</th>
                            <th scope="col">Pavadinimas</th>
                            <th scope="col">Kaina</th>
                            <th scope="col">Pica</th>
                            <th scope="col">Veiksmai</th>
                            {/* public Product(String productName, Pizza pizza, double productPrice) */}
                        </tr>
                    </thead>
                    <tbody>
                       
                    {products.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{product.productName}</td>
                            <td>{product.productPrice} €</td>
                            <td>{product.pizza}</td>
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
export default ManagerProductsList