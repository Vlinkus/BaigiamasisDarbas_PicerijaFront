import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap"
import { NavbarProps } from "reactstrap"
import Container from "react"
import { Link } from "react-router-dom"
import "./Appnavbar.css"
import pizzeria from "./Images/pizzeria.jpg"

export default function Header() {
    return (
        <>
            <div class="p_navbar_wrapper">
                <div class="p_navbar_">
                    <section class="p_left-items">
                        <Link to="/">
                            <img src={pizzeria} style={{height:"3.5em"}}/>
                        </Link>
                        <Link to="/picos">
                            <div class="p_nav-item">Picos</div>
                        </Link>
                        <Link to="/404">
                            <div class="p_nav-item">Kontaktai</div>
                        </Link>
                    </section>
                    <section class="p_right-items">
                        <Link to="/login">
                            <div class="p_nav-item">Prisijungti</div>
                        </Link>
                        <Link to="/register">
                            <div class="p_nav-item">Registruotis</div>
                        </Link>
                    </section>
                </div>
            </div>
        </>
    )
}