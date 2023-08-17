import { useState } from "react";
import ManagerPizzaList from "./ManagerPizzaList";
import ManagerProductsList from "./ManagerProductsList";
import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";
import ManagerOrdersList from "./ManagerOrderList";
import ManagementGuide from "./ManagementGuide";

function ManagerNavBar() {
  const [activeSubMenu, setActiveSubMenu] = useState("home");
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

  const handleSubMenuClick = (submenu) => {
    setActiveSubMenu(submenu);
  };

  return (
    <div className="container-fluid manager">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/manage/v1"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">{t("mngMenu")}</span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <a
                  href="#submenu0"
                  className="nav-link align-middle px-0"
                  onClick={() => handleSubMenuClick("home")}
                >
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    {t("mngGuide")}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#submenu2"
                  className="nav-link px-0 align-middle"
                  onClick={() => handleSubMenuClick("picos")}
                >
                  <i className="fs-4 bi-grid"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">{t("Pizzas")}</span>
                </a>
              </li>
              <li>
                <a href="#submenu3" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-grid"></i>{" "}
                  <span
                    className="ms-1 d-none d-sm-inline"
                    onClick={() => handleSubMenuClick("products")}
                  >
                    {t("Products")}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link px-0 align-middle"
                  onClick={() => handleSubMenuClick("orders")}
                >
                  <i className="fs-4 bi-table"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">{t("Orders")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-3 manager">
          {activeSubMenu === "picos" && (
            <div>
              <ManagerPizzaList />
            </div>
          )}

          {activeSubMenu === "products" && (
            <div>
              <ManagerProductsList />
            </div>
          )}

          {activeSubMenu === "orders" && (
            <div>
              <ManagerOrdersList />
            </div>
          )}

          {/* Default content when no submenu is selected */}
          {activeSubMenu === "home" && (
            <div>
              <ManagementGuide />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ManagerNavBar;
