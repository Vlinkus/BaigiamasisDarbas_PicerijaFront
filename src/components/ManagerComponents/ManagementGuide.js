import { useState } from "react";
import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";
import ManagerGuidePizza from "./ManagerGuidePizza";
import ManagerGuideProduct from "./ManagerGuideProduct";
import ManagerGuideOrder from "./ManagerGuideOrder";

export default function ManagementGuid() {
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const handleSubMenuClick = (submenu) => {
    setActiveSubMenu(submenu);
  };

  return (
    <>
      <div className="managerGuidIntroduction">
        <h1>{t("mngGuide")}</h1>
        <p className="lead">{t("seeSideBar")}</p>
        <ol>
          <li>{t("mngGuide")}</li>
          <li>{t("Pizzas")}</li>
          <li>{t("Products")}</li>
          <li>{t("Orders")}</li>
        </ol>
        {t("seeButtonsBellow")}
      </div>
      <div className="instructionButtons">
        <button
          type="button"
          className="btn btn-dark instructionButton"
          onClick={() => handleSubMenuClick("products")}
        >
          {t("Products")}
        </button>
        <button
          type="button"
          className="btn btn-dark instructionButton"
          onClick={() => handleSubMenuClick("pizzas")}
        >
          {t("Pizzas")}
        </button>
        <button
          type="button"
          className="btn btn-dark instructionButton"
          onClick={() => handleSubMenuClick("orders")}
        >
          {t("Orders")}
        </button>
      </div>
      <div className="col py-3 manager">
        {activeSubMenu === "pizzas" && <div> <ManagerGuidePizza /> </div>}
        {activeSubMenu === "products" && <div> <ManagerGuideProduct /> </div>}
        {activeSubMenu === "orders" && <div> <ManagerGuideOrder /> </div>}
      </div>
    </>
  );
}
