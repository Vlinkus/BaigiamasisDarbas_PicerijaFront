import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

const Layout = () => {
    return (
        <>
        <Header />
        <div className="p_wrapper">
            <div className="p_content">
                <Outlet />
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Layout