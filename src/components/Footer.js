import { Link } from "react-router-dom";

export default function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  function Order({ closeHour, openHour }) {
    return (
      <div className="order">
        <p>
          "We're open from" {openHour}:00 "to" {closeHour}:00 "Come visit us or
          order online."
        </p>
      </div>
    );
  }

  return (
    <footer className="p_footer-wrapper">
      <div className="p_footer">
        <div className="p_footer-heading footer-1">
          <h2>About Us</h2>
          <Link to="/">Contacts</Link>
          <Link to="/404">Demo</Link>
          <Link to="/picos">Customers</Link>
          <Link to="#">Investors</Link>
          <Link to="#">Terms of Service</Link>
        </div>
        <div className="p_footer-heading footer-2">
          <h2>Contact Us</h2>
          <Link to="#">Jobs</Link>
          <Link to="#">Support</Link>
          <Link to="#">Sponsorships</Link>
        </div>
        <div className="p_footer-heading footer-3">
          <h2>Social media</h2>
          <Link to="#">Facebook</Link>
          <Link to="#">Instagram</Link>
          <Link to="#">Youtube</Link>
          <Link to="#">Twitter</Link>
          <Link to="#">GitHub</Link>
        </div>
        <div className="p_footer-heading footer-4">
          {isOpen ? (
            <Order closeHour={closeHour} openHour={openHour} />
          ) : (
            <p>
              We're happy to welcome you between {openHour}:00 and {closeHour}
              :00{" "}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
