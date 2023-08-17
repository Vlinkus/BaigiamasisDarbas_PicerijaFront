import { Link } from "react-router-dom";
import { useTranslationAndLanguageChange } from "./TranslationComponents/TranslationUtils";

export default function Footer() {
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

  const openHour = 10;
  const closeHour = 22;

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
          <a href="https://www.facebook.com/">FaceBook</a>
          <a href="https://www.youtube.com/">YouTube</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://github.com/Vlinkus/BaigiamasisDarbas_PicerijaFront">
            GitHub
          </a>
        </div>
        <div className="p_footer-heading footer-4">
          <p>
            {t("We're happy to welcome you between ")} {openHour}:00{" "}
            {t(" and ")} {closeHour}
            :00{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
