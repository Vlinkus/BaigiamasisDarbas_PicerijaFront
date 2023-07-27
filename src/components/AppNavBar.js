import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { NavbarProps } from 'reactstrap';
import Container from 'react';
import {Link} from 'react-router-dom';
import './Appnavbar.css';
import pizzeria from './Images/pizzeria.jpg';


function AppNavbar(){
        return (
            <div className="col-8 nav-img">
               <img id="navPizza" src={pizzeria} alt="pizzeria" />
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Logo</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Pradžia</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/picos">Picos</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav> 
             </div>
          );
}
export default AppNavbar;