import { useState } from "react";
import { useQuestionStore } from "@/store";
import { toast } from "sonner";

export const Home = () => { 
  const {answer, orderId, code: gameCode, setOrderId, setCode : setGameCode, setSelectedAnswer } = useQuestionStore((state: any) => ({
    answer: state.answer,
    orderId: state.orderId,
    code: state.code,
    setOrderId: state.setOrderId,
    setCode: state.setCode,
    setSelectedAnswer: state.setSelectedAnswer,
  }));
  const [_answer, _setAnswer] = useState("")
  const [code, setCode] = useState(gameCode);
  
  const handleSetCode = (e: any) => {
    e.preventDefault();
    setGameCode(code);
    toast('موفق', {
      className: 'rtl text-right gap-x-4',
      description: 'کد بازی با موفقیت ثبت شد',
      duration: 5000,
      icon: "✅",
    });
  };
  const handleAnswerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('answer') as HTMLInputElement;
    const inputValue = input.value;
    setSelectedAnswer(_answer)
    form.reset();
    toast('موفق', {
      className: 'rtl text-right gap-x-4',
      description: 'جواب بازی با موفقیت ثبت شد',
      duration: 5000,
      icon: "✅",
    });
  };
  const handleOrderIdSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('orderId') as HTMLInputElement;
    const inputValue = input.value;
    setOrderId(+inputValue)
    form.reset();
    toast('موفق', {
      className: 'rtl text-right gap-x-4',
      description: 'نوبت سوال با موفقیت ثبت شد',
      duration: 5000,
      icon: "✅",
    });
  };
  return <> 
      <div className="flex flex-col items-center justify-end w-full text-right  ">
          <form onSubmit={handleSetCode} className="mt-3 flex flex-col">
            <label className="flex flex-col mb-3">
              <p>کد بازی را وارد کنید</p>
              <input
                type="text"
                className="bg-blue-50 rounded-xl px-3 py-2 mt-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="کد بازی"
              />
            </label>
            <button type="submit" className="bg-blue-500 text-white rounded-xl px-3 py-2">ثبت کنید</button>
          </form>
          <form onSubmit={handleAnswerSubmit} className="mt-3 flex flex-col">
            <label className="flex flex-col mb-3">
              <p>جواب سوال را وارد کنید</p>
              <input
                type="text"
                className="bg-blue-50 rounded-xl px-3 py-2 mt-2"
                name="answer"
                value={_answer}
                defaultValue={answer}
                onChange={(e) => _setAnswer(e.target.value)}
                placeholder="جواب سوال"
              />
            </label>
            <button type="submit" className="bg-amber-500 text-white rounded-xl px-3 py-2">ثبت کنید</button>
          </form>
          <form onSubmit={handleOrderIdSubmit} className="mt-3 flex flex-col">
            <label className="flex flex-col mb-3">
              <p>نوبت سوال را وارد کنید</p>
              <input
                type="text"
                inputMode="numeric"
                className="bg-blue-50 rounded-xl px-3 py-2 mt-2"
                name="orderId"
                value={orderId}
                onChange={(e) => setOrderId(Number(e.target.value))}
                placeholder="نوبت سوال"
              />
            </label>
            <button type="submit" className="bg-amber-500 text-white rounded-xl px-3 py-2">ثبت کنید</button>
          </form>
      </div>
  </>
  
}