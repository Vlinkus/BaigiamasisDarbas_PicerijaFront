import { useState } from "react";
import ManagerPizzaList from "./ManagerPizzaList";
import ManagerProductsList from "./ManagerProductsList";

function ManagerNavBar(){
    const [activeSubMenu, setActiveSubMenu] = useState('home');
    
    const handleSubMenuClick = (submenu) => {
        setActiveSubMenu(submenu);
    };
  

    return(
        <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/manage/v1" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">Manager Menu</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <a href="#submenu0" className="nav-link align-middle px-0" onClick={() => handleSubMenuClick('home')}>
                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#submenu1" className="nav-link px-0 align-middle" onClick={() => handleSubMenuClick('dashboard')}>
                                <i className="fs-4 bi-speedometer2"></i> 
                                <span className="ms-1 d-none d-sm-inline">Dashboard</span> 
                            </a>
                        </li>
                       
                        <li>
                            <a href="#submenu2" className="nav-link px-0 align-middle" onClick={() => handleSubMenuClick('picos')}>
                                <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline" >Picos</span> 
                            </a>
                        </li>
                        <li>
                            <a href="#submenu3" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline"onClick={() => handleSubMenuClick('products')}>Products</span> 
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-0 align-middle" onClick={() => handleSubMenuClick('orders')}>
                                <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
                <div className="col py-3">
                    {activeSubMenu === 'dashboard' && (
                        <div>
                            {/* Content for Dashboard submenu */}
                            <h3>Dashboard Submenu Content</h3>
                            <p>This is the content for the Dashboard submenu.</p>
                        </div>
                    )}

                    {activeSubMenu === 'picos' && (
                        <div>
                            <ManagerPizzaList />
                        </div>
                    )}

                    {activeSubMenu === 'products' && (
                        <div>
                           <ManagerProductsList />
                        </div>
                    )}

                    {activeSubMenu === 'orders' && (
                        <div>
                            {/* Content for Orders submenu */}
                            <h3>Orders Submenu Content</h3>
                            <p>This is the content for the Orders submenu.</p>
                        </div>
                    )}

                    {/* Default content when no submenu is selected */}
                    {activeSubMenu === 'home' && (
                        <div>
                            <h3>Vadovo meniu Instrukcija</h3>
                            <p className="lead">
                                TO DO Parašyti vadovo instrukcija, kaip naudotis  šiuo vadovo puslapiu.<br/><br />
                                An example 2-level sidebar with collapsible menu items. The menu functions like an "accordion" where only a single
                                menu is open at a time. While the sidebar itself is not toggle-able, it does responsively shrink in width on smaller screens.</p>
                            <ul className="list-unstyled">
                                <li><h5>Responsive</h5> shrinks in width, hides text labels, and collapses to icons only on mobile</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
    </div>
    );
}
export default ManagerNavBar;