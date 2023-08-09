import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { NavbarProps } from "reactstrap";
import Container from "react";
import { Link } from "react-router-dom";
// import "./Appnavbar.css";
import pizzeria from "./Images/pizzeria.jpg";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

  return (
    <>
      <div className="p_navbar_wrapper">
        <div className="p_navbar_">
          <section className="p_left-items">
            <Link to="/">
              <img src={pizzeria} style={{ height: "3.5em" }} />
            </Link>
            <Link to="/picos">
              <div className="p_nav-item">{t("Pizzas")}</div>
            </Link>
            <Link to="/404">
              <div className="p_nav-item">{t("Contacts")}</div>
            </Link>
            <Link to="/manage/v1">
              <div className="p_nav-item">{t("Contacts")}</div>
            </Link>
          </section>
          <section className="p_right-items">
            <Link to="/login">
              <div className="p_nav-item">{t("Login")}</div>
            </Link>
            <Link to="/register">
              <div className="p_nav-item">{t("Register")}</div>
            </Link>
            <Link to="/order">
              <div className="p_nav-item">Order</div>
            </Link>

            <select
              className="custom-select"
              style={{ width: 100 }}
              onChange={changeLanguageHandler}
            >
              <option value="lt">Lietuvių</option>
              <option value="en">English </option>
            </select>
          </section>
        </div>
      </div>
    </>
  );
}
