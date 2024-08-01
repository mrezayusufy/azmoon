import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../layouts/mainLayout/sidebar";
import TopNav from "../../layouts/mainLayout/top-nav";

export const Welcome = () => {
  const {
    register: registerOrderId,
    handleSubmit: handleSubmitOrderId,
    formState: { errors: errorsOrderId },
  } = useForm();

  const {
    register: registerTypedAnswer,
    handleSubmit: handleSubmitTypedAnswer,
    formState: { errors: errorsTypedAnswer },
  } = useForm();

  const onSubmitOrderId = (data) => {
    localStorage.setItem("orderId", data.orderId);
    toast.success("نوبت سوال با موفقیت ثبت شد", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const onSubmitTypedAnswer = (data) => {
    localStorage.setItem("TypedAnswer", data.TypedAnswer);
    toast.success("جواب بازی با موفقیت ثبت شد", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="main">
        <TopNav />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <form onSubmit={handleSubmitOrderId(onSubmitOrderId)}>
                            <div className="mb-3">
                              <label className="form-label">نوبت سوال</label>
                              <input
                                className={`form-control ${
                                  errorsOrderId.orderId ? "is-invalid" : ""
                                }`}
                                type="text"
                                {...registerOrderId("orderId", {
                                  required: true,
                                })}
                              />
                              {errorsOrderId.orderId && (
                                <div className="invalid-feedback">
                                  نوبت سوال مورد نیاز است
                                </div>
                              )}
                            </div>
                            <div className="text-center mt-3">
                              <button type="submit" className="btn btn-primary">
                                ثبت کنید
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mt-4 mt-md-0">
                      <div className="card">
                        <div className="card-body">
                          <form
                            onSubmit={handleSubmitTypedAnswer(
                              onSubmitTypedAnswer
                            )}
                          >
                            <div className="mb-3">
                              <label className="form-label">جواب سوال</label>
                              <input
                                className={`form-control ${
                                  errorsTypedAnswer.TypedAnswer
                                    ? "is-invalid"
                                    : ""
                                }`}
                                type="text"
                                {...registerTypedAnswer("TypedAnswer", {
                                  required: true,
                                })}
                              />
                              {errorsTypedAnswer.TypedAnswer && (
                                <div className="invalid-feedback">
                                  جواب سوال مورد نیاز است
                                </div>
                              )}
                            </div>
                            <div className="text-center mt-3">
                              <button type="submit" className="btn btn-primary">
                                ثبت کنید
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      <ToastContainer rtl />
    </div>
  );
}; 