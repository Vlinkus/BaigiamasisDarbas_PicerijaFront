//import i18n from "../i18n"
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("PageLost")}</h1>
      <p>{t("TryHomePage")}</p>
    </>
  );
}
