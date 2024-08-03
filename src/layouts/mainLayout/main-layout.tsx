import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";

export const MainLayout = () => {
  return <div className="wrapper bg-blue-50" style={{ minHeight: "100vh" }}>
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
                  © 2024 - <a className="text-muted">آزمون</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
};
 
