export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer">
                <div className="footer-heading footer-1">
                    <h2>About Us</h2>
                    <a href="#">Contacts</a>
                    <a href="#">Demo</a>
                    <a href="#">Customers</a>
                    <a href="#">Investors</a>
                    <a href="#">Terms of Service</a>
                </div>
                <div className="footer-heading footer-2">
                    <h2>Contact Us</h2>
                    <a href="#">Jobs</a>
                    <a href="#">Support</a>
                    <a href="#">Sponsorships</a>
                </div>
                <div className="footer-heading footer-3">
                    <h2>Social media</h2>
                    <a href="#">facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Youtube</a>
                    <a href="#">Twitter</a>
                    <a href="#">GitHub</a>
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