import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  function Order({ closeHour, openHour }) {
    return (
      <div className="order">
        <p>
          "We're open from" {openHour}:00 "to" {closeHour}:00 "Come visit us or
          order online."
        </p>
      </div>
    );
  }
  return (
    <footer className="p_footer-wrapper">
      <div className="p_footer">
        <div className="p_footer-heading footer-1">
          <h2>{t("AboutUs")}</h2>
          <Link to="/">{t("Contacts")}</Link>
          <Link to="/404">{t("Demo")}</Link>
          <Link to="/picos">{t("Customers")}</Link>
          <Link to="/users">{t("Investors")}</Link>
          <Link to="#">{t("TermsOfService")}</Link>
        </div>
        <div className="p_footer-heading footer-2">
          <h2>{t("Contact Us")}</h2>
          <Link to="#">{t("Jobs")}</Link>
          <Link to="#">{t("Support")}</Link>
          <Link to="#">{t("Sponsorships")}</Link>
        </div>
        <div className="p_footer-heading footer-3">
          <h2>{t("SocialMedia")}</h2>
          <Link to="#">Facebook</Link>
          <Link to="#">Instagram</Link>
          <Link to="#">Youtube</Link>
          <Link to="#">Twitter</Link>
          <Link to="#">GitHub</Link>
        </div>
        <div className="p_footer-heading footer-4">
          {isOpen ? (
            <Order closeHour={closeHour} openHour={openHour} />
          ) : (
            <p>
              We're happy to welcome you between {openHour}:00 and {closeHour}
              :00{" "}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
