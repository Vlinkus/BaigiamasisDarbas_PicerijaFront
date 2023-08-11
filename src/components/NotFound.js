//import i18n from "../i18n"
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();
    // const changeLanguageHandler = (e) => {
    //     const languageValue = e.target.value
    //     i18n.changeLanguage(languageValue);
    //   }
    return (
        <>
        <h1>{t('PageLost')}</h1>
        <p>{t('TryHomePage')}</p>
        </>
    );
}