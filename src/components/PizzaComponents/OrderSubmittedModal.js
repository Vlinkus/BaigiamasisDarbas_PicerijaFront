import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";

export default function OrderSubmittedModal({ showModal, onClose, order }) {
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

    return (
        <div className="order-submition-modal ">
        <div className="modal-content">
            <div className="orderModalHeader-order">
                <h3 className="orderModalTitle" id="orderModalLabel">
                {t("Order Complete")}
                </h3>
            </div>
            <div className="modal-body">
              <h2>{t("Order No")} {order.id}</h2>
                      <ul className="orderListPizzas">
                          {order.pizzas.map((pizza, index) => (
                              <li  key={`${pizza.id}${index}`}>{pizza.pizzaName}</li>
                          ))}
                      </ul>
                 <p className="orderListPizzas" > {t("willBeReadyShortly")} </p>
              </div>
            <div className="orderModalFooter">
                <button
                    type="button"
                    className="btn btn-success orderModalButton"
                    onClick={onClose}
                >
                    {t("close")}
                </button>
            </div>
        </div> 
    </div>
    );
}
