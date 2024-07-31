import { useAppContext } from "../../contexts/app/app-context";
import { useNavigate } from "react-router";

const TopNav = () => {
  const { toggleSidebar } = useAppContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("code");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center gap-3">
       
      </div>
      <div className="me-auto">
        <button
          className="btn ms-2 btn-outline-danger fw-bolder"
          onClick={logout}
        >
          خروج
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
