import { useQuestionStore } from "@/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner"
export const Welcome = () => {
  const { setOrderId, setSelectedAnswer } = useQuestionStore((_: any) => ({ setOrderId: _.setOrderId, setSelectedAnswer: _.setSelectedAnswer }));
  const {
    register: registerOrderId,
    handleSubmit: handleSubmitOrderId,
    setValue: setValueOrderId,
    formState: { errors: errorsOrderId, isSubmitting: isSubmittingOrderId },
  } = useForm({
    defaultValues: {
      orderId: useQuestionStore.getState().orderId,
    },
  });

  const {
    register: registerAnswer,
    handleSubmit: handleSubmitAnswer,
    formState: { errors: errorsAnswer },
  } = useForm();

  const onSubmitOrderId = (data: any) => {
    setOrderId(data.orderId)
    toast.success("نوبت سوال با موفقیت ثبت شد", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const onSubmitAnswer = (data: any) => {
    setSelectedAnswer(data.answer)
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
                      <input className={`form-control ${errorsOrderId.orderId ? "is-invalid" : ""}`}
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
                  <form onSubmit={handleSubmitAnswer(onSubmitAnswer)}>
                    <div className="mb-3">
                      <label className="form-label">جواب سوال</label>
                      <input
                        className={`form-control ${errorsAnswer.Answer
                            ? "is-invalid"
                            : ""
                          }`}
                        type="text"
                        {...registerAnswer("answer", {
                          required: true,
                        })}
                      />
                      {errorsAnswer.Answer && (
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
};
