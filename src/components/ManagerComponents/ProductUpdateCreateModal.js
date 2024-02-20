import axios from "axios";
import React from "react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input, Form, FormGroup } from "reactstrap";
import { useTranslationAndLanguageChange } from '../TranslationComponents/TranslationUtils';

function ProductUpdateCreateModal({showModal, closeModal, product}){
    const [productToUpdate, setProductToUpdate] = useState({
        id: product ? product.id : null,
        productName: product ? product.productName : '',
        productPrice: product ? product.productPrice : ''   
    });
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
    const handleSubmit = () => {
        const myMethod = productToUpdate.id ? 'PUT' : 'POST';
        axios
        .request({
            url: '/api/product',
            method: myMethod,
            data: productToUpdate
        })
        .then((response) => {
            closeModal();
        })
        .catch((error) => {
            console.error("Klaida išsaugant produktą", error);
        })

    }

    function handleChange(event) {
        const { name, value } = event.target;
            setProductToUpdate((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
      }
    return(
        <div className="modal-dialog modal-lg">
            <Modal isOpen={showModal} toggle={closeModal}>
                <ModalHeader >{productToUpdate.productName ? `${productToUpdate.productName}` : null}
                    {productToUpdate.productName ? t("Updating Product") : t("New Product Addition")} </ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            <Label htmlFor="productName">{t("Products Name")}</Label>
                            <Input type="text" name="productName" id="productName" value={productToUpdate.productName || ''}
                                onChange={handleChange} autoComplete="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="productPrice">{t("Unit Price")}</Label>
                            <Input type="text" name="productPrice" id="pproductPriceizzaPrice" value={productToUpdate.productPrice || ''}
                                onChange={handleChange} autoComplete="productPrice" />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit} >
                        {t("Submit")}
                    </Button>
                    <Button color="secondary" onClick={closeModal}>
                        {t("Cancel")}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default ProductUpdateCreateModal;
