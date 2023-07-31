import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="footer">
                <div className="footer-heading footer-1">
                    <h2>About Us</h2>
                    <Link to="/">Contacts</Link>
                    <Link to="/404">Demo</Link>
                    <Link to="/picos">Customers</Link>
                    <Link to="#">Investors</Link>
                    <Link to="#">Terms of Service</Link>
                </div>
                <div className="footer-heading footer-2">
                    <h2>Contact Us</h2>
                    <Link to="#">Jobs</Link>
                    <Link to="#">Support</Link>
                    <Link to="#">Sponsorships</Link>
                </div>
                <div className="footer-heading footer-3">
                    <h2>Social media</h2>
                    <Link to="#">facebook</Link>
                    <Link to="#">Instagram</Link>
                    <Link to="#">Youtube</Link>
                    <Link to="#">Twitter</Link>
                    <Link to="#">GitHub</Link>
                </div>
                <div className="footer-email-form">
                    <h2>Join our newsletter</h2>
                    <input type="email" placeholder="Enter an email address" id="footer-email"/>
                    <input type="submit" value="Sign up" id="footer-email-btn" />
                </div>
            </div>
        </footer>
    );
}