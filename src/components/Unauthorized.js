import i18n from "../i18n"
import { useTranslation } from "react-i18next";

export default function Unauthorized() {
    const { t, i18n } = useTranslation();
    const changeLanguageHandler = (e) => {
        const languageValue = e.target.value
        i18n.changeLanguage(languageValue);
      }
    return (
        <>
        <h1>{t('NoAuthorization')}</h1>
        <p>{t('TryAuthorizing')}</p>
        </>
    );
}