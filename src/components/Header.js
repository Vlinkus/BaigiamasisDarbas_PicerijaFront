import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import pizzeria from "./Images/pizzeria.jpg";
import { useTranslation } from "react-i18next";

export default function Header() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [lang, setlang] = useState(localStorage.getItem("lang"));

  const { t, i18n } = useTranslation();
  const [showLogin, setShowLogin] = useState();

  const { auth, setAuth } = useAuth();

  useEffect(() => {
    setShowLogin(Object.keys(auth).length === 0);
  }, [auth]);

  const signOut = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
    setlang(languageValue);
    localStorage.setItem("lang", languageValue);
  };

  return (
    <>
      <div className="p_navbar_wrapper">
        <div className="p_navbar_">
          <section className="p_left-items">
            <Link to="/">
              <img src={pizzeria} style={{ height: "3.5em" }} alt="" />
            </Link>
            <Link to="/picos">
              <div className="p_nav-item">{t("Pizzas")}</div>
            </Link>
            <Link to="/contacts">
              <div className="p_nav-item">{t("Contacts")}</div>
            </Link>
            {!showLogin && ["ADMIN", "MANAGER"].includes(auth?.role) ? (
              <>
                <Link to="/manage/v1">
                  <div className="p_nav-item">{t("Manager")}</div>
                </Link>
              </>
            ) : (
              <></>
            )}
          </section>
          <section className="p_right-items">
            {showLogin ? (
              <>
                <Link to="/login">
                  <div className="p_nav-item">{t("Login")}</div>
                </Link>
                <Link to="/register">
                  <div className="p_nav-item">{t("Register")}</div>
                </Link>
              </>
            ) : (
              <>
                <Link onClick={signOut}>
                  <div className="p_nav-item">{t("Logout")}</div>
                </Link>
              </>
            )}
            <select
              className="custom-select"
              style={{ width: 100 }}
              onChange={changeLanguageHandler}
              value={lang}
            >
              <option value="lt">Lietuvių</option>
              <option value="en">English</option>
            </select>
          </section>
        </div>
      </div>
    </>
  );
}
