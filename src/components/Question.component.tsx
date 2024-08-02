import React, { useEffect } from "react";
import { Option } from "./Option.component";
import { IQuestion } from "../interfaces";
import { QuestionItem } from "./QuestionItem.component";
import { useQuestionStore } from "../store";
import { Timer } from "./Timer.component";
import { cn } from "../utils";
import { OptionItem } from "./OptionItem.component";
interface Props {
  question: IQuestion;
}
export const Question: React.FC<Props> = ({question}) =>{ 
  const { setOrderId, setQuestion, answerChecked, selectedAnswer, orderId} = useQuestionStore();
  const updateStore = () => {
    useQuestionStore.persist.rehydrate()
  }
  
  useEffect(() => {
    if(question) setQuestion(question);
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'r') setOrderId(1)
      if(event.key === 'i' || event.key === 'ه') setOrderId(orderId+1)
    }
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener("visibilitychange", updateStore);
    window.addEventListener("focus", updateStore);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener("visibilitychange", updateStore);
      window.removeEventListener("focus", updateStore);
    };
  },[orderId])

  enum OPTION_ENUM {
    FLASE = "غلط",
    TRUE = "صحیح"
  } 
  const opt = [OPTION_ENUM.FLASE,OPTION_ENUM.TRUE];
  return <section className="w-[500px] mb-10 flex flex-col gap-y-4 justify-center">
    <QuestionItem content={question.content}/>
  <section className="flex flex-wrap gap-3 items-center justify-center">
    {question?.questionType === 0 && <OptionItem/>}
    {question?.questionType === 2 && question.options.split("،").map((item: string) => {
      let color = '';
      if (answerChecked) {
        if (item === question?.correctAnswer)
          color = 'truthy';
        else if (item === selectedAnswer)
          color = 'falsy'
      } else if(item === selectedAnswer)
        color = "selected"
      return <div className="w-[160px]" key={item}>
        <Option content={item} color={color} />
      </div>
    }
    )}
      {question?.questionType === 1 && opt.map((item) => {
        let color = '';
        if (answerChecked) {
          if (item === question?.correctAnswer)
            color = 'truthy';
          else if (item === selectedAnswer)
            color = 'falsy'
        } else if(item === selectedAnswer)
          color = "selected"
        return <div key={item} className={cn(selectedAnswer === item && "drop-shadow-xl scale-110 ", "transition-all duration-300")}>
        <Option color={item === OPTION_ENUM.TRUE ? "truthy" : "falsy"} content={item}/>
      </div>
      })}
  </section>
  <div className="absolute right-0 bottom-0 w-[500px]">
    <Timer timer={question.timer} />
  </div>
</section>
}