import { Link } from "react-router-dom";
import front from "./Images/menuBook.png";
import "./Home.css";
import { useTranslationAndLanguageChange } from "./TranslationComponents/TranslationUtils";

export default function Home() {
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();

  const textContent = `${t("Authentic Italian Cuisine")}
  ${t("Creative Dishes to Choose From")}
  ${t("All from Our Stone Oven")}
  ${t("All Organic")}
  ${t("All Delicious")}`;

  return (
    <div className="container">
      <Link to="/picos">
        <img className="menuBookImage" src={front} alt="menuBook" />
      </Link>
      <pre className="custom-header">{textContent}</pre>
    </div>
  );
}
