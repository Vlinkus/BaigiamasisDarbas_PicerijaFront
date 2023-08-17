import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";

export default function ManagerGuideOrder() {
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
    return (
        <div>
            <ul className="managerGuidInstructionsList">
                <li>
                    <h2>{t("Managment of Order List Page")}</h2>
                    <p> {t("In Order page you can see Order list in a table")}</p>
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>{t("Line Number")}</th>
                                <th>{t("Order Number")}</th>
                                <th>{t("Pizza Name")}</th>
                                <th>{t("Pizza Count")}</th>
                                <th>{t("Unit Price")}</th>
                                <th>{t("Total Price")}</th>
                                <th>{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>1</td>
                                <td>1</td>
                                <td>Margarita</td>
                                <td> 2 </td>
                                <td> 14 € </td>
                                <td> 28 € </td>
                                <td>
                                    <button type="button" className="btn btn-warning"> {t("Update")} </button>
                                    <button type="button" className="btn btn-danger" > {t("Delete")} </button>
                                </td>
                            </tr>
                            <tr><td scope="row">2</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
                        </tbody>
                    </table>
                    <p>{t("In table column Actions you can see buttons")} <br />
                        <button type="button" className="btn btn-warning"> {t("Update")} </button>
                        <button type="button" className="btn btn-danger" > {t("Delete")} </button> <br />
                        {t("Clicked Update button opens")} {t("Order update window.")} {t("Change all required fields and Press SUBMIT.")} {t("Order will be updated.")}<br />
                        {t("Clicked Delete button will delete Order from table")}
                    </p>
                </li>
            </ul>
        </div>
    );
}