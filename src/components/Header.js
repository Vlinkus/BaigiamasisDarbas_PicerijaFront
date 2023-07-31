import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap"
import { NavbarProps } from "reactstrap"
import Container from "react"
import { Link } from "react-router-dom"
import "./Appnavbar.css"
import pizzeria from "./Images/pizzeria.jpg"

export default function Header() {
    return (
        <>
            <nav class="navbar_wrapper">
                <div class="navbar">
                    <section class="left-items">
                        <Link to="/">
                            <img src={pizzeria} style={{height:"3.5em"}}/>
                        </Link>
                        <Link to="/picos">
                            <div class="nav-item">Picos</div>
                        </Link>
                        <Link to="/404">
                            <div class="nav-item">Kontaktai</div>
                        </Link>
                    </section>
                    <section class="right-items">
                        <Link to="/login">
                            <div class="nav-item">Prisijungti</div>
                        </Link>
                        <Link to="/register">
                            <div class="nav-item">Registruotis</div>
                        </Link>
                    </section>
                </div>
            </nav>
        </>
    )
}