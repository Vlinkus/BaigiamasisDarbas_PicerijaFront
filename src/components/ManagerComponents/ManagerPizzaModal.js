import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import { Button,Label,Input,Form,FormGroup} from "reactstrap";
import "./ManagerModal.css";
import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";

function ManagerPizzaModal({ showModal, closeModal, pizza }) {
  const [pizzaToEdit, setPizzaToEdit] = useState({
    id: pizza ? pizza.id : null,
    pizzaName: pizza ? pizza.pizzaName : "",
    pizzaPrice: pizza ? pizza.pizzaPrice : "",
    pizzaSize: pizza ? pizza.pizzaSize : "",
    pizzaPhoto: pizza ? pizza.pizzaPhoto : null,
    products: pizza ? pizza.products : []
  });
  const formData = new FormData();
  const [productsList, setProductsList] = useState([]);
  const pizzaModalClassName = showModal
    ? "modal display-block"
    : "modal display-none";
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProductsList(response.data);
      })
      .catch((error) => {
        console.error("Klaida gavus produktų duomenis:", error);
      });
  }, []);

  const handleSubmit = () => {
    const method = pizzaToEdit.id ? "PUT" : "POST";
    axios
      .request({
        url: "http://localhost:3000/api/pizza",
        method: method,
        data: pizzaToEdit
      })
      .then((response) => {
        console.log(response);
        if (formData.has("pizzaPhoto")) {
          imageSave(response.data.id, formData);
        }
        closeModal();
      })
      .catch((error) => {
        console.error("Klaida išsaugant picos pakeitimus", error);
      });
  };

  const handleProductCheck = (selectedProduct, isChecked) => {
    if (isChecked) {
      setPizzaToEdit((prevPizza) => ({
        ...prevPizza,
        products: [...prevPizza.products, selectedProduct]
      }));
    } else {
      setPizzaToEdit((prevPizza) => ({
        ...prevPizza,
        products: prevPizza.products.filter(
          (product) => product.id !== selectedProduct.id
        )
      }));
      console.log("Pizza product List: ", pizzaToEdit.products);
    }
  };
  const base64ToImageUrl = (base64String) => {
    return `data:image/*;base64,${base64String}`;
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setPizzaToEdit((prevPizza) => ({
      ...prevPizza,
      [name]: value
    }));
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    formData.append("pizzaPhoto", file);
  };
  const imageSave = (id, formData) => {
    const pizzaPhotoUploadUrl = `/api/pizza/${id}/uploadPhoto`;
    axios
      .post(pizzaPhotoUploadUrl, formData)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  return (
    <>
      <div
        className={pizzaModalClassName}
        id="pizzaModal"
        tabIndex="-1"
        aria-labelledby="pizzaModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="pizzaModalLabel">
               {pizzaToEdit.pizzaName ? t("Updating Pizza") : t("Add New Pizza")  }
              </h5>
            </div>
            <div className="modal-body">
              <Form>
                <div className="row">
                  <div className="col">
                    <FormGroup>
                      <Label htmlFor="pizzaName">{t("Pizza Name")}</Label>
                      <Input
                        type="text"
                        name="pizzaName"
                        id="pizzaName"
                        value={pizzaToEdit.pizzaName || ""}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="pizzaPrice">{t("Unit Price")}</Label>
                      <Input
                        type="text"
                        name="pizzaPrice"
                        id="pizzaPrice"
                        value={pizzaToEdit.pizzaPrice || ""}
                        onChange={handleChange}
                        autoComplete="pizzaPrice"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="pizzaSize">{t("Pizza Size")}</Label>
                      <Input
                        type="text"
                        name="pizzaSize"
                        id="pizzaSize"
                        value={pizzaToEdit.pizzaSize || ""}
                        onChange={handleChange}
                        autoComplete="pizzaSize"
                      />
                    </FormGroup>
                    <FormGroup>
                      <h4 htmlFor="pizzaProducts">{t("Products")}</h4>
                      {productsList.map((product) => (
                        <div className="form-check" key={product.id}>
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            value={product.id}
                            id={`productCheckbox_${product.id}`}
                            checked={pizzaToEdit.products.some(
                              (p) => p.id === product.id
                            )}
                            onChange={(event) => {
                              const { value, checked } = event.target;
                              handleProductCheck(product, checked);
                            }}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor={`productCheckBox_${product.id}`}
                          >
                            {t(`${product.productName}`)}
                          </Label>
                        </div>
                      ))}
                      
                    </FormGroup>
                  </div>
                  <div className="col">
                    <div className="current-pizza-img">
                      <h4>
                          {pizzaToEdit ? (
                              <>{pizzaToEdit.pizzaName} {t("Pizza Picture")}</>
                            ) : (
                              t("Pizza does not have any picture")
                            )}
                      </h4>
                      {pizzaToEdit.pizzaPhoto && (
                        <img
                          className="managerImages"
                          src={base64ToImageUrl(pizzaToEdit.pizzaPhoto)}
                          alt={"Picos paveikslėlis"}
                        />
                      )}
                      <Label className="form-label" htmlFor="customFile">
                        {t("Choose New Pizza Picture")}
                      </Label>
                      <Input
                        type="file"
                        className="form-control"
                        id="pizzaPhoto"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                {t("Submit")}
              </button>
              <Button className="btn btn-warning" onClick={closeModal}>
                {t("Cancel")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPizzaModal;
