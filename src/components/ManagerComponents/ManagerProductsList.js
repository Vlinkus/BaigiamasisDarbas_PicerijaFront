import axios from "axios";
import { useEffect, useState } from "react";
import ProductUpdateCreateModal from "./ProductUpdateCreateModal";
import { useTranslationAndLanguageChange } from '../TranslationComponents/TranslationUtils';

function ManagerProductsList(){
    const [products, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

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
            console.log(products);
            setShowModal(true);
        }

    return(
        <>
            <button type="button" className="btn btn-success" onClick={() => handleCreatNewProduct()}>
                {t("Add New Product")}
            </button>
            <h2>{t("Products List")}</h2>
            <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{t("Line Number")}</th>
                            <th scope="col">{t("Product Name")}</th>
                            <th scope="col">{t("Unit Price")}</th>
                            <th scope="col">{t("Actions")}</th>
                            {/* public Product(String productName, Pizza pizza, double productPrice) */}
                        </tr>
                    </thead>
                    <tbody>
                       
                    {products.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{t(`${product.productName}`)}</td>
                            <td>{product.productPrice} €</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={() => handleUpdate(product)}>
                                    {t("Update")}
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                                    {t("Delete")}
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