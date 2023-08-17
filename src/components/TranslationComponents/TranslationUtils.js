import { useTranslation } from "react-i18next";

export const useTranslationAndLanguageChange = () => {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

  return { t, changeLanguageHandler };
};
