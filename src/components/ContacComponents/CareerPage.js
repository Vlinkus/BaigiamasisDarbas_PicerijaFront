import "../PizzaComponents/PicosPage.css" 
import { useTranslation } from "react-i18next";
    
const CareerPage = () => {
   const { t } = useTranslation();

    return <>
      <div className="pizzas-container" style={{"flex-direction": "row", "align-items": "top"}}>
         <div className="p_content_space"></div>

         <div style={{"display": "block"}}>
         <h1><i>{t("JobsWelcome")}</i></h1>
         <p><strong>{t("JobsWhy")}</strong></p>
         <p>{t("JobsWhy1of3")}<br/>{t("JobsWhy2of3")}<br/>{t("JobsWhy3of3")}</p>
         <p><strong>{t("JobsOpenings")}</strong></p>
         <ol>
            <li>
               <p><strong>{t("JobsPizzaChef")}</strong></p>
               <ul>
                  <li>{t("JobsLocation")}{t("Location1")}</li>
                  <li>
                     {t("JobsResponsibilities")}
                     <ul>
                        <li>{t("JobsPizzaChefResp1of3")}</li>
                        <li>{t("JobsPizzaChefResp2of3")}</li>
                        <li>{t("JobsPizzaChefResp3of3")}</li>
                     </ul>
                  </li>
                  <li>
                     {t("JobsQualifications")}
                     <ul>
                        <li>{t("JobsPizzaChefQual1of3")}</li>
                        <li>{t("JobsPizzaChefQual2of3")}</li>
                        <li>{t("JobsPizzaChefQual3of3")}</li>
                     </ul>
                  </li>
               </ul>
            </li>
            <li>
               <p><strong>{t("JobsServer")}</strong></p>
               <ul>
                  <li>{t("JobsLocation")}{t("Location2")}</li>
                  <li>
                     {t("JobsResponsibilities")}
                     <ul>
                        <li>{t("JobsServerResp1of3")}</li>
                        <li>{t("JobsServerResp2of3")}</li>
                        <li>{t("JobsServerResp3of3")}</li>
                     </ul>
                  </li>
                  <li>
                     {t("JobsQualifications")}
                     <ul>
                        <li>{t("JobsServerQual1of3")}</li>
                        <li>{t("JobsServerQual2of3")}</li>
                        <li>{t("JobsServerQual3of3")}</li>
                     </ul>
                  </li>
               </ul>
            </li>
            <li>
               <p><strong>{t("JobsDeliveryDriver")}</strong></p>
               <ul>
                  <li>{t("JobsLocation")}{t("Location3")}</li>
                  <li>
                     {t("JobsResponsibilities")}
                     <ul>
                        <li>{t("JobsDeliveryDriverResp1of3")}</li>
                        <li>{t("JobsDeliveryDriverResp2of3")}</li>
                        <li>{t("JobsDeliveryDriverResp3of3")}</li>
                     </ul>
                  </li>
                  <li>
                     {t("JobsQualifications")}
                     <ul>
                        <li>{t("JobsDeliveryDriverQual1of3")}</li>
                        <li>{t("JobsDeliveryDriverQual2of3")}</li>
                        <li>{t("JobsDeliveryDriverQual3of3")}</li>
                     </ul>
                  </li>
               </ul>
            </li>
         </ol>
         <p><strong>{t("JobsPerks")}</strong></p>
         <ul>
            <li>{t("JobsPerk1of6")}</li>
            <li>{t("JobsPerk2of6")}</li>
            <li>{t("JobsPerk3of6")}</li>
            <li>{t("JobsPerk4of6")}</li>
            <li>{t("JobsPerk5of6")}</li>
            <li>{t("JobsPerk6of6")}</li>
         </ul>
         <p><strong>{t("JobsHowToApply")}</strong></p>
         <ol>
            <li>{t("JobsHowTo1of6")}</li>
            <li>{t("JobsHowTo2of6")}</li>
            <li>{t("JobsHowTo3of6")}</li>
            <li>{t("JobsHowTo4of6")}</li>
            <li>{t("JobsHowTo5of6")}</li>
            <li>{t("JobsHowTo6of6")}</li>
         </ol>
         <p>{t("JobsJoinUs")}</p>
      </div>

      <div className="p_content_space"></div>
      </div>
   </>
};
export default CareerPage;