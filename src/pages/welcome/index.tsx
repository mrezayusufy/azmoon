import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../layouts/mainLayout/sidebar";
import TopNav from "../../layouts/mainLayout/top-nav";
import { useFormStore } from "@/store/useFormStore";

type OrderIdFormData = {
  orderId: number;
};

type TypedAnswerFormData = {
  typedAnswer: string;
};

type AnnouncerFormData = {
  announcer: string;
};

export const Welcome: React.FC = () => {
  const { setOrderId, setTypedAnswer, setAnnouncer } = useFormStore();

  // Initialize form state from zustand store
  const {
    register: registerOrderId,
    handleSubmit: handleSubmitOrderId,
    setValue: setValueOrderId,
    formState: { errors: errorsOrderId, isSubmitting: isSubmittingOrderId },
  } = useForm<OrderIdFormData>({
    defaultValues: {
      orderId: useFormStore.getState().orderId,
    },
  });

  const {
    register: registerTypedAnswer,
    handleSubmit: handleSubmitTypedAnswer,
    setValue: setValueTypedAnswer,
    formState: {
      errors: errorsTypedAnswer,
      isSubmitting: isSubmittingTypedAnswer,
    },
  } = useForm<TypedAnswerFormData>({
    defaultValues: {
      typedAnswer: useFormStore.getState().typedAnswer,
    },
  });

  const {
    register: registerAnnouncer,
    handleSubmit: handleSubmitAnnouncer,
    setValue: setValueAnnouncer,
    formState: { errors: errorsAnnouncer, isSubmitting: isSubmittingAnnouncer },
  } = useForm<AnnouncerFormData>({
    defaultValues: {
      announcer: useFormStore.getState().announcer,
    },
  });

  const onSubmitOrderId: SubmitHandler<OrderIdFormData> = (data) => {
    setOrderId(data.orderId);
    toast.success("نوبت سوال با موفقیت ثبت شد", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const onSubmitTypedAnswer: SubmitHandler<TypedAnswerFormData> = (data) => {
    setTypedAnswer(data.typedAnswer);
    toast.success("جواب بازی با موفقیت ثبت شد", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const onSubmitAnnouncer: SubmitHandler<AnnouncerFormData> = (data) => {
    setAnnouncer(data.announcer);
    toast.success("نام گوینده بازی با موفقیت ثبت شد", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  // Sync form values with zustand store
  useEffect(() => {
    setValueOrderId("orderId", useFormStore.getState().orderId);
    setValueTypedAnswer("typedAnswer", useFormStore.getState().typedAnswer);
    setValueAnnouncer("announcer", useFormStore.getState().announcer);
  }, [setValueOrderId, setValueTypedAnswer, setValueAnnouncer]);

  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="main">
        <TopNav />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <div className="card mb-4">
                        <div className="card-body">
                          <form onSubmit={handleSubmitOrderId(onSubmitOrderId)}>
                            <div className="mb-3">
                              <label className="form-label">نوبت سوال</label>
                              <input
                                className={`form-control ${
                                  errorsOrderId.orderId ? "is-invalid" : ""
                                }`}
                                type="number"
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
                              <button
                                type="submit"
                                disabled={isSubmittingOrderId}
                                className="btn btn-primary"
                              >
                                {isSubmittingOrderId
                                  ? "منتظر بمانید"
                                  : "ثبت کنید"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <div className="card mb-4">
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
                                  errorsTypedAnswer.typedAnswer
                                    ? "is-invalid"
                                    : ""
                                }`}
                                type="text"
                                {...registerTypedAnswer("typedAnswer", {
                                  required: true,
                                })}
                              />
                              {errorsTypedAnswer.typedAnswer && (
                                <div className="invalid-feedback">
                                  جواب سوال مورد نیاز است
                                </div>
                              )}
                            </div>
                            <div className="text-center mt-3">
                              <button
                                type="submit"
                                disabled={isSubmittingTypedAnswer}
                                className="btn btn-primary"
                              >
                                {isSubmittingTypedAnswer
                                  ? "منتظر بمانید"
                                  : "ثبت کنید"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <div className="card mb-4">
                        <div className="card-body">
                          <form
                            onSubmit={handleSubmitAnnouncer(onSubmitAnnouncer)}
                          >
                            <div className="mb-3">
                              <label className="form-label">نام گوینده</label>
                              <input
                                className={`form-control ${
                                  errorsAnnouncer.announcer ? "is-invalid" : ""
                                }`}
                                type="text"
                                {...registerAnnouncer("announcer", {
                                  required: true,
                                })}
                              />
                              {errorsAnnouncer.announcer && (
                                <div className="invalid-feedback">
                                  نام گوینده الزامی می باشد
                                </div>
                              )}
                            </div>
                            <div className="text-center mt-3">
                              <button
                                type="submit"
                                disabled={isSubmittingAnnouncer}
                                className="btn btn-primary"
                              >
                                {isSubmittingAnnouncer
                                  ? "منتظر بمانید"
                                  : "ثبت کنید"}
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
