import { FormComponent } from "@/components";
import { ScoreForm } from "@/components/Form/ScoreForm.component";
import { SHORTCUTS } from "@/constants";
import { useAppContext } from "@/contexts";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
type ScoreInput = {
  teamId: string;
  score: string;
}
export const Welcome = () => {
  const { state, setOrderId, setAnswer, setAnnouncer, setWinner, setStarter } = useAppContext();
  // starter
  const {IsAnnouncer,IsQuestion,IsScore,IsWinner} = state.starter
   
  //+++++++++++++ winner +++++++++++++
  const {
    register: registerWinner,
    handleSubmit: handleSubmitWinner,
    formState: { errors: errorsWinner},
  } = useForm({
    defaultValues: {
      winner: state.winner,
    },
  });
  //+++++++++++ orderid ++++++++++++++++
  const {
    register: registerOrderId,
    handleSubmit: handleSubmitOrderId,
    formState: { errors: errorsOrderId},
  } = useForm({
    defaultValues: {
      orderId: state.orderId,
    },
  });
  //++++++++++++++++ answer ++++++++++++++++++
  const {
    register: registerAnswer,
    handleSubmit: handleSubmitAnswer,
    formState: { errors: errorsAnswer },
  } = useForm({
    defaultValues: {
      answer: state.answer,
    },
  });
  //++++++++++++++ announcer ++++++++++++++
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
   
  const onSubmitWinner = (data: any) => {
    setWinner(data.winner)
    toast("برنده بازی با موفقیت ثبت شد");
  };

  const onSubmitAnswer = (data: any) => {
    setAnswer(data.answer)
    toast("جواب بازی با موفقیت ثبت شد");
  };

  const onSubmitAnnouncer = (data: any) => {
    setAnnouncer(data.announcer);
    toast("نام گوینده بازی با موفقیت ثبت شد");
  }; 

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const boolValue = Boolean(value);
    const starter = {
      IsAnnouncer: false,
      IsWinner: false,
      IsScore: false,
      IsQuestion: false,
    }
    // به روز رسانی وضعیت‌ها
    if (name === "IsAnnouncer") {
      setStarter({...starter, IsAnnouncer: boolValue})
    } else if (name === "IsQuestion") {
      setStarter({...starter, IsQuestion: boolValue})
    } else if (name === "IsScore") {
      setStarter({...starter, IsScore: boolValue})
    } else if (name === "IsWinner") {
      setStarter({...starter, IsWinner: boolValue})
    }
  };
  return <div className="container">
      <div className="row justify-content-center">
      <details className="bg-white py-3 px-3 rounded-md mb-3 flex flex-col gap-y-3">
        <summary>شارتکت ها</summary>
        <ol >
          {Object.keys(SHORTCUTS).map((shortcutKey: any) => {
            const item = SHORTCUTS[shortcutKey];
            const key = item.key;
            return (
              <li key={shortcutKey}>
                <strong>{item.title}:</strong>{' '}
                {item.ctrl && <><kbd>ctrl</kbd><span>+</span></>}
                {item.shift && <><kbd>shift</kbd><span>+</span></>}
                <kbd>{key}</kbd>
              </li>
            )
          })}
        </ol>
      </details>
          <div className="row justify-center">
            {/* orderId */}
            <FormComponent
              onSubmit={handleSubmitOrderId(onSubmitOrderId)}
              register={registerOrderId("orderId", { required: true })}
              errors={errorsOrderId.orderId}
              label="نوبت سوال"
              buttonText="ثبت کنید"
            /> 
            {/* answer */}
            <FormComponent
              onSubmit={handleSubmitAnswer(onSubmitAnswer)}
              register={registerAnswer("answer", { required: true })}
              errors={errorsAnswer.answer} 
              label="جواب سوال"
              buttonText="ثبت کنید"
            /> 
            {/* announcer */}
            <FormComponent
              onSubmit={handleSubmitAnnouncer(onSubmitAnnouncer)}
              register={registerAnnouncer("announcer", { required: true })}
              errors={errorsAnnouncer.announcer} 
              label="نام گوینده"
              buttonText="ثبت کنید"
            />
            {/* winner */}
            <FormComponent
              onSubmit={handleSubmitWinner(onSubmitWinner)}
              register={registerWinner("winner", { required: true })}
              errors={errorsWinner.winner} 
              label="نام برنده بازی"
              buttonText="ثبت کنید"
            /> 
            {/* score */}
            <ScoreForm/>
            
          </div>
          <div className="row mt-4">
        {["IsAnnouncer", "IsScore", "IsWinner", "IsQuestion"].map(
          (item, index) => (
            <div className="col-md-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <label className="form-label">
                    نمایش {item.replace("Is", "")}
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={item}
                      value="true"
                      checked={
                        item === "IsAnnouncer"
                          ? IsAnnouncer
                          : item === "IsQuestion"
                          ? IsQuestion
                          : item === "IsScore"
                          ? IsScore
                          : IsWinner
                      }
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label">فعال</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={item}
                      value="false"
                      checked={
                        item === "IsAnnouncer"
                          ? !IsAnnouncer
                          : item === "IsQuestion"
                          ? !IsQuestion
                          : item === "IsScore"
                          ? !IsScore
                          : !IsWinner
                      }
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label">غیر فعال</label>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      </div>
    </div>
};
