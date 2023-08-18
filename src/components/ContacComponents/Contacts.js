import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";
import MyMapComponent from "./MyMapComponent";

function WhereToFind(){   
  const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
    return (
        <div class="container demo-bg">
            <div class="row">
                <div class="col-sm-2"> 
                Vilnius, Gedimino pr. 9, 01105 <br />
                </div>
                <div class="col-sm-3">
                    <div class="business-hours">
                        <h2 class="title">{t("Work Hours")}</h2>
                        <ul class="list-unstyled opening-hours">
                            <li>{t("Monday")} <span class="pull-right">10:00-22:00</span></li>
                            <li>{t("Tuesday")} <span class="pull-right">10:00-22:00</span></li>
                            <li>{t("Wednesday")} <span class="pull-right">10:00-22:00</span></li>
                            <li>{t("Thursday")} <span class="pull-right">10:00-22:00</span></li>
                            <li>{t("Friday")} <span class="pull-right">10:00-22:00</span></li>
                            <li>{t("Saturday")} <span class="pull-right">10:00-22:00</span></li>
                            <li>{t("Sunday")} <span class="pull-right">10:00-22:00</span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-6">
                   <MyMapComponent />
                </div>
            </div>
        </div>
    );
}
export default WhereToFind;