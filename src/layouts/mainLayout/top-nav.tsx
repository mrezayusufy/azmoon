import { useAppContext } from "@/contexts";
import { useFormStore, useQuestionStore } from "@/store"
import { useNavigate } from "react-router";

const TopNav = () => {
  const navigate = useNavigate();
  const { setAnnouncer } = useFormStore();
  const { setCode, setOrderId, setSelectedAnswer, setAnswer } = useQuestionStore();
  const logout = () => {
    setCode("");
    setOrderId(1);
    setAnswer("");
    setSelectedAnswer("");
    setAnnouncer("");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <div className="d-flex align-items-center gap-3"></div>
      <div className="mr-auto">
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
