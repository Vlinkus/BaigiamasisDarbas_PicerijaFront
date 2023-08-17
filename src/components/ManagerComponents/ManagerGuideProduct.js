import { useTranslationAndLanguageChange } from "../TranslationComponents/TranslationUtils";

export default function ManagerGuideProduct() {
    const { t, changeLanguageHandler } = useTranslationAndLanguageChange();
    return (
        <div>
            <ul className="managerGuidInstructionsList">
                <li>
                    <h2>{t("Adding New Product")}</h2>
                    <p>{t("At the top of Products page there is button")}   <button className="btn btn-success">{t("Add New Product")} </button>
                        {t("Clicked button opens new Product creation window. Fill all fields and Press SUBMIT. New Product will be created.")}
                    </p>
                </li>
                <li>
                    <h2>{t("Managment of Products List Page")}</h2>
                    <p> {t("Bellow you can see products list in a table")}</p>
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>{t("Line Number")}</th>
                                <th>{t("Product Name")}</th>
                                <th>{t("Unit Price")}</th>
                                <th>{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td> 1 </td>
                                <td> {t("Mozzarella")} </td>
                                <td> 3.1 €</td>
                                <td>
                                    <button type="button" className="btn btn-warning"> {t("Update")} </button>
                                    <button type="button" className="btn btn-danger" > {t("Delete")} </button>
                                </td>
                            </tr>
                            <tr><td scope="row">2</td><td>...</td><td>...</td><td>...</td></tr>
                        </tbody>
                    </table>
                    <p>{t("In table column Actions you can see buttons")} <br />
                        <button type="button" className="btn btn-warning"> {t("Update")} </button>
                        <button type="button" className="btn btn-danger" > {t("Delete")} </button> <br />
                        {t("Clicked Update button opens")} {t("Product update window.")} {t("Change all required fields and Press SUBMIT.")} {t("Product will be updated.")}<br />
                        {t("Clicked Delete button will delete Product from table")}
                    </p>
                </li>
            </ul>
        </div>
    );
}