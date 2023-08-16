import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import { useTranslationAndLanguageChange } from '../TranslationComponents/TranslationUtils';

export default function OrderSubmittedModal ({ showModal, onClose, order }){
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

    return (
        <div className="order-submition-modal">
            <Modal isOpen={showModal} toggle={onClose}>
                <ModalHeader className="orderModalHeader" ><h1>{t("Order Complete")}</h1></ModalHeader>
                <ModalBody>
                <h2>{t("Order No")} {order.id}</h2>
                    <ul>
                        {order.pizzas.map((pizza, index) => (
                            <li key={`${pizza.id}${index}`}>{pizza.pizzaName}</li>
                        ))}
                    </ul>
                {t("willBeReadyShortly")}
                </ModalBody>
                <ModalFooter className="orderModalFooter">
                    <Button color="success" onClick={onClose}>
                        {t("close")}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}