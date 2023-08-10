import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import pizzeria from "./Images/pizzeria.jpg";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { axiosPrivate }  = useAxiosPrivate();
  const [ showLogin, setShowLogin ] = useState();
  
  const { auth, setAuth  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setShowLogin(Object.keys(auth).length === 0)
  },[auth])

  const logout = async () => {
    setAuth({});
    setShowLogin(false)
    navigate('/');
  }

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
              <img src={pizzeria} style={{ height: "3.5em" }} alt=''/>
            </Link>
            <Link to="/picos">
              <div className="p_nav-item">{t("Pizzas")}</div>
            </Link>
            <Link to="/404">
              <div className="p_nav-item">{t("Contacts")}</div>
            </Link>
            { showLogin ? (<></>): (
            <Link to="/manage/v1">
              <div className="p_nav-item">{t("Manager")}</div>
            </Link>
            )}

          </section>
          <section className="p_right-items">

            { showLogin ? (<>

            <Link to="/login">
              <div className="p_nav-item">{t("Login")}</div>
            </Link>
            <Link to="/register">
              <div className="p_nav-item">{t("Register")}</div>
            </Link>

            </>) : (<>

            <Link onClick={logout}>
            <div className="p_nav-item">Logout</div>
            </Link>

            </>)}

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
