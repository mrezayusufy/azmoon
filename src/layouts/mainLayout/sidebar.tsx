import { useAppContext } from "@/contexts";
import { NavLink } from "react-router-dom";
import { LOGO } from "@/constants"
import { HomeIcon, PodiumIcon, QuestionIcon, ScoreIcon, TeamIcon } from "@/components"
import { cn } from "@/utils";
import { AnnouncerIcon } from "@/components/icons/Announcer.icon";

const Sidebar = () => {
  const { state } = useAppContext();
  
  const size = 24;
  return (
    <nav className={`sidebar ${!state.showSidebar ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <div className={cn("text-blue-50 flex flex-col justify-center align-center items-center pt-0 mb-0")}>
          <img src={LOGO} alt="logo" className="w-20"/>
          <p className="mb-0" style={{ fontSize: "90%" }}>
            برنامه آزمون
          </p>
        </div>

        <ul className="sidebar-nav pe-0">
          <li className="sidebar-header fw-bolder fs-lg">دشبورد مسابقه</li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link flex active" : "sidebar-link"
              }
              to={"/"}
              rel="noopener noreferrer"
            >
              <PodiumIcon width={size} height={size} />
              <span className="align-middle me-2">مدیریت مسابقه</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/team"}
              rel="noopener noreferrer"
            >
              <TeamIcon width={size} height={size}/>
              <span className="align-middle me-2">  لیست امتیاز تیم ها</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/question"}
              rel="noopener noreferrer"
            >
              <QuestionIcon width={size} height={size}/>
              <span className="align-middle me-2">نمایش سوالات</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/winner"}
              rel="noopener noreferrer"
            >
              <ScoreIcon width={size} height={size}/>
              <span className="align-middle me-2">برنده بازی</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/host-introduction"}
              rel="noopener noreferrer"
            >
              <AnnouncerIcon width={size} height={size}/>
              <span className="align-middle me-2">گوینده برنامه</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/starter"}
              rel="noopener noreferrer"
            >
              <HomeIcon width={size} height={size}/>
              <span className="align-middle me-2">شروع بازی</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
