import { useAppContext } from "@/contexts";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
export const Welcome = () => {
  const { state, setOrderId, setAnswer, setAnnouncer } = useAppContext();
  const {
    register: registerOrderId,
    handleSubmit: handleSubmitOrderId,
    formState: { errors: errorsOrderId, isSubmitting: isSubmittingOrderId },
  } = useForm({
    defaultValues: {
      orderId: state.orderId,
    },
  });

  const {
    register: registerAnswer,
    handleSubmit: handleSubmitAnswer,
    formState: { errors: errorsAnswer },
  } = useForm({
    defaultValues: {
      answer: state.answer,
    },
  });

  const {
    register: registerAnnouncer,
    handleSubmit: handleSubmitAnnouncer,
    formState: { errors: errorsAnnouncer },
  } = useForm({
    defaultValues: {
      announcer: state.announcer,
    },
  });

  const onSubmitOrderId = (data: any) => {
    setOrderId(data.orderId)
    toast("نوبت سوال با موفقیت ثبت شد");
  };

  const onSubmitAnswer = (data: any) => {
    setAnswer(data.answer)
    toast("جواب بازی با موفقیت ثبت شد");
  };

  const onSubmitAnnouncer = (data: any) => {
    setAnnouncer(data.announcer);
    toast("نام گوینده بازی با موفقیت ثبت شد");
  }; 
  return <div className="container mt-5">
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
                        className={`form-control ${errorsAnswer.answer
                            ? "is-invalid"
                            : ""
                          }`}
                        type="text"
                        {...registerAnswer("answer", {
                          required: true,
                        })}
                      />
                      {errorsAnswer.answer && (
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
            {/* announcer */}
            <div className="col-md-6 mt-4 mt-md-0">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmitAnnouncer(onSubmitAnnouncer)}>
                    <div className="mb-3">
                      <label className="form-label">نام گوینده</label>
                      <input
                        className={`form-control ${errorsAnnouncer.announcer
                            ? "is-invalid"
                            : ""
                          }`}
                        type="text"
                        {...registerAnnouncer("announcer", {
                          required: true,
                        })}
                      />
                      {errorsAnnouncer.announcer && (
                        <div className="invalid-feedback">
                          نام گوینده را وارد کنید
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
