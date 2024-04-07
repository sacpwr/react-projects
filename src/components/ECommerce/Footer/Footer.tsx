import "./styles.css";

export default function Footer() {
  return (
    <div className="footer-bar">
      <div className="footer-social">
        <div className="footer-fb"></div>
        <div className="footer-tw"></div>
        <div className="footer-in"></div>
      </div>
      <div className="footer-address">
        <span>
          250 Executive Park Blvd, Suit 3400. San Francisco CA 94134. United
          State
        </span>
      </div>
      <div className="footer-contact-details">
        <div className="mobile-no">
          <div className="contact-logo"></div>
          <span className="contact-no">+123-456-789</span>
        </div>
        <div className="email">
          <div className="email-logo"></div>
          <span className="email-id">info@gmail.com</span>
        </div>
      </div>
      <div className="footer-copyright">
        <span className="copyright-text">Copyright @Cloth 2024</span>
      </div>
    </div>
  );
}
