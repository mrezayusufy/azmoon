import { useAppContext } from "../../contexts/app/app-context";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <nav className={`sidebar ${!showSidebar ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <a className="sidebar-brand d-flex flex-column align-items-center pt-0 mb-0">
          <img src="" alt="logo" style={{ height: "80px" }} />
          <p className="mb-0" style={{ fontSize: "90%" }}>
            برنامه آزمون
          </p>
        </a>

        <ul className="sidebar-nav pe-0">
          <li className="sidebar-header fw-bolder fs-lg">صفحات مسابقه</li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-edit align-middle me-2"></i>
              <span className="align-middle me-2">مدیریت مسابقه</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/team"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-users align-middle me-2"></i>
              <span className="align-middle me-2">نمایش تیم ها</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/question"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-question align-middle me-2"></i>
              <span className="align-middle me-2">نمایش سوالات</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/score"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-trophy align-middle me-2"></i>
              <span className="align-middle me-2">نمایش نمرات تیم ها</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
