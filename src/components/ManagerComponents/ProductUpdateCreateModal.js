import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  Form,
  FormGroup
} from "reactstrap";

function ProductUpdateCreateModal({ showModal, closeModal, product }) {
  const [productToUpdate, setProductToUpdate] = useState({
    id: product ? product.id : null,
    productName: product ? product.productName : "",
    productPrice: product ? product.productPrice : ""
  });
  const handleSubmit = () => {
    const myMethod = productToUpdate.id ? "PUT" : "POST";
    axios
      .request({
        url: "http://localhost:3000/api/product",
        method: myMethod,
        data: productToUpdate
      })
      .then((response) => {
        console.log(response);
        closeModal();
      })
      .catch((error) => {
        console.error("Klaida išsaugant produktą", error);
      });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setProductToUpdate((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  }
  return (
    <div className="modal-dialog modal-lg">
      <Modal isOpen={showModal} toggle={closeModal}>
        <ModalHeader>
          {productToUpdate.productName
            ? `${productToUpdate.productName} Atnaujinimas`
            : "Naujo produkto Pridėjimas"}{" "}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="productName">Pavadinimas</Label>
              <Input
                type="text"
                name="productName"
                id="productName"
                value={productToUpdate.productName || ""}
                onChange={handleChange}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="productPrice">Kaina</Label>
              <Input
                type="text"
                name="productPrice"
                id="pproductPriceizzaPrice"
                value={productToUpdate.productPrice || ""}
                onChange={handleChange}
                autoComplete="productPrice"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Patvirtinti
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Atšaukti
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ProductUpdateCreateModal;
