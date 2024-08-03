import { useAppContext } from "@/contexts";
import { useFormStore, useQuestionStore } from "@/store"
import { useNavigate } from "react-router";

const TopNav = () => {
  const navigate = useNavigate();
  const {reset, toggleSidebar} = useAppContext();
  const logout = () => {
    reset();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center gap-3"></div>
      <div className="mr-auto">
        <button className="btn ms-2 btn-outline-danger fw-bolder" onClick={logout}>
          خروج
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
