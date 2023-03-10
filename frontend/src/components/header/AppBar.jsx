import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import "../../assets/css/header/AppBar.scss";
import "../../assets/js/header/AppBar";

function AppBar({ menu }) {
  // CONST //
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // RETURN //
  return (
    <>
      <nav id="navbar" className="">
        <div className="nav-wrapper">
          {/* <!-- Navbar Logo --> */}
          <div className="logo">
            {/* <!-- Logo Placeholder for Inlustration --> */}
            <button type="button" onClick={() => navigate("/")}>
              <b>&#x202d;&lt;/&gt;💨</b>KATA-SR
            </button>
          </div>
          {/* <!-- Navbar Links --> */}
          <ul id="menu">
            {!user.email && (
              <>
                {menu?.filter((item) => item.label !== "Home").map((page) => (
                  <li key={`li-desktop${page.label}`}>
                    <button
                      type="button"
                      onClick={() => navigate(page.path)}
                      key={page.label}
                      id={page.label}
                    >
                      {page.label}
                    </button>
                  </li>
                ))}
              </>
            )}
            {user.email && (
              <>
                {menu?.map((page) => (
                  <li key={`li-desktop${page.label}`}>
                    <button
                      type="button"
                      onClick={() => navigate(page.path)}
                      key={page.label}
                      id={page.label}
                    >
                      {page.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button type="button" onClick={() => logout()}>
                    Déconnexion
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* <!-- Menu Icon --> */}
      <div className="menuIcon">
        <span className="icon icon-bars" />
        <span className="icon icon-bars overlay" />
      </div>

      <div className="overlay-menu">
        <ul id="menu">
          {menu?.map((page) => (
            <li key={`li-mobile${page.label}`}>
              <button
                type="button"
                onClick={() => navigate(page.path)}
                key={page.label}
                id={page.label}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default AppBar;

AppBar.propTypes = {
  menu: PropTypes.instanceOf(Array).isRequired,
};
