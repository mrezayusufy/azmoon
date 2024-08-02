import { useFormStore } from "@/store/useFormStore";
import { useQuestionStore } from "@/store/useQuestionStore";
import { useNavigate } from "react-router";

const TopNav = () => {
  const navigate = useNavigate();
  const { setOrderId, setTypedAnswer, setAnnouncer } = useFormStore();
  const { setCode } = useQuestionStore();
  const logout = () => {
    // پاک کردن localStorage
    localStorage.removeItem("code");

    // پاک کردن وضعیت‌ها
    setCode("");
    setOrderId(1);
    setTypedAnswer("");
    setAnnouncer("");

    // هدایت به صفحه ورود
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <div className="d-flex align-items-center gap-3">{/* سایر عناصر */}</div>
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
