import axios from "axios";
import { useEffect, useState } from "react";
import ProductUpdateCreateModal from "./ProductUpdateCreateModal";

function ManagerProductsList(){
    const [products, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleDelete = (productIdToDelete) => {
        axios
          .delete(`/api/product/${productIdToDelete}`)
          .then((response) => {
            // Ištrynus perkrauna sąrašą iš kart
            axios.get("/api/products").then((response) => {
              setProduct(response.data);
            });
          })
          .catch((error) => {
            console.error("Klaida ištrinant pproductą:" +{productIdToDelete}, error);
          });
      };

      const handleUpdate = (productIdToUpdate) =>{
        setSelectedProduct(productIdToUpdate);
        setShowModal(true);
      };
      const closeModal = () =>{
        setSelectedProduct(null);
        axios.get("/api/products").then((response) => {
            setProduct(response.data);
          });
        setShowModal(false);
        };
        const handleCreatNewProduct = () =>{
            setSelectedProduct(null);
            setShowModal(true);
        }

    return(
        <>
            <button type="button" className="btn btn-success" onClick={() => handleCreatNewProduct()}>
                Pridėti Naują Produktą
            </button>
            <h2>Produktų sąrašas</h2>
            <table className="table table-hover table-striped">
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
                            <th scope="row">{index+1}</th>
                            <td>{product.productName}</td>
                            <td>{product.productPrice} €</td>
                            <td>{product.pizza}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={() => handleUpdate(product)}>
                                    Atnaujinti
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                                    Ištrinti
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {showModal && (
                    <ProductUpdateCreateModal showModal={showModal} closeModal={closeModal} product={selectedProduct} />
                )}
        </>
    );
}
export default ManagerProductsList