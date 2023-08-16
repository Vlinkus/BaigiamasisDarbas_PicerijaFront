import { useState } from 'react';
import { useTranslationAndLanguageChange } from '../TranslationComponents/TranslationUtils';

export default function ManagementGuid (){
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
    const [activeSubMenu, setActiveSubMenu] = useState('');

    const handleSubMenuClick = (submenu) => {
        setActiveSubMenu(submenu);
    };

    return (
        <>
            <h1>{t("mngGuide")}</h1>
            <p className="lead">
                {t("seeSideBar")}
            </p>
                <ol>
                    <li>{t("mngGuide")}</li>
                    <li>{t("Pizzas")}</li>
                    <li>{t("Products")}</li>
                    <li>{t("Orders")}</li>
                </ol>
                {t("seeButtonsBellow")}
            
                <div className="instructionButtons" >
                <button type="button" className="btn btn-outline-secondary instructionButton"
                    onClick={() => handleSubMenuClick('products')}
                >
                   {t("Products")}
                </button>
                <button type="button" className="btn btn-outline-secondary instructionButton"
                    onClick={() => handleSubMenuClick('pizzas')}
                >
                   {t("Pizzas")}
                </button>
                <button type="button" className="btn btn-outline-secondary instructionButton"
                    onClick={() => handleSubMenuClick('orders')}
                >
                   {t("Orders")}
                </button>
                </div>
            <div className="col py-3 manager">
                {activeSubMenu === 'pizzas' && (
                    <div>
                        Picos
                    </div>
                )}
                {activeSubMenu === 'products' && (
                    <div>
                        Produktai
                    </div>
                )}

                {activeSubMenu === 'orders' && (
                    <div>
                        Užsakymai
                    </div>
                )}
            </div>
           
      
        </>
    );
}