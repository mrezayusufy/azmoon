import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";

const MainLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("code");
  if (!token) {
    return navigate("/login", { replace: true });
  }

  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="main">
        <TopNav />
        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <p className="mb-0">
                  © 2024 - <a className="text-muted">وب فلو</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
