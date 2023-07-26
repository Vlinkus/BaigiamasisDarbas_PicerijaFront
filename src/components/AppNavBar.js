import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import './Appnavbar.css';


function AppNavbar(){
        return (
            <div className='wrapper'>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <div className="container-fluid">
                        <p>Logo</p>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink tag={Link} to="/">
                                        Pradžia
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink tag={Link} to="/picos">
                                        Picos
                                    </NavLink>
                                </li>
                            </ul>
                            <img className="myimage" src='/Images/pizzeria.jpg' alt="pizzeria" />
                        </div>
                    </div>
                </nav>
                {/* <Navbar color="light" light expand="md" className="custom-navbar">
           
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/about">
                       Apie mus
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/contacts">
                       Susisiekite
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/where">
                       Mus Rasite
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/login">
                       login
                    </NavLink>
                  </NavItem>
                </Nav>
              </Navbar>
              <Navbar color="dark" dark expand="md" className="custom-navbar">
                <NavbarBrand tag={Link} to="/">
                     Pizzeria
                </NavbarBrand>
                <NavbarBrand tag={Link} to="/pizza">
                  Picos
                </NavbarBrand> 
                 </Navbar> */}
            </div>
          );
}
export default AppNavbar;