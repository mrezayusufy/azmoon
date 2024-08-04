import React, { useEffect } from "react";
import { Option } from "./Option.component";
import { IQuestion } from "@/interfaces";
import { QuestionItem } from "./QuestionItem.component";
import { Timer } from "./Timer.component";
import { cn } from "@/utils";
import { OptionItem } from "./OptionItem.component";
import { useAppContext } from "@/contexts";
import FramePlayer from "./Countdown/Countdown.component";
interface Props {
  question: IQuestion;
}
export const Question: React.FC<Props> = ({ question }) => {
  const { state, setQuestion } = useAppContext();

  useEffect(() => {
    if (question) setQuestion(question);
  }, []);

  enum OPTION_ENUM {
    FLASE = "غلط",
    TRUE = "صحیح",
  }
  const opt = [OPTION_ENUM.FLASE, OPTION_ENUM.TRUE];
  return (
    <section className="w-[500px] mb-10 flex flex-col gap-y-4 justify-center">

      <section className="flex flex-wrap gap-3 items-center justify-center">
        <QuestionItem content={question.content} />
        {question?.questionType === 0 && <OptionItem />}
        {question?.questionType === 2 &&
          question.options.split("،").map((item: string) => {
            let color = "";
            const isChecked = Boolean(state.isChecked)
            if (isChecked) {
              if(item === question?.correctAnswer) color = "truthy" 
              else if (item === state.answer) color = "falsy";
            } else if(item === state.answer) color = "selected";
            return (
              <div className="w-[160px]" key={item}>
                <Option content={item} color={color} />
              </div>
            );
          })}
        {question?.questionType === 1 &&
          opt.map((item) => {
            let color = "";
            const isChecked = Boolean(state.isChecked)
            let content = "";
            if (isChecked) {
              if (item === question?.correctAnswer) { 
                color = "truthy";
                content = item + " ✅"
              }
              else if (item === state.answer) {
                color = "falsy";
                content = item;
              }
            } else if (item === state.answer) {
              color = "selected"
              content = item + " 🔲"
            };
            return (
              <div
                key={item}
                className={cn(
                  state.answer === item && "drop-shadow-xl scale-110 ",
                  "transition-all duration-300",
                  state.answer === item && (state.question?.correctAnswer !== state.answer ? "opacity-50" : "")
                )}
              >
                <Option
                  color={item === OPTION_ENUM.TRUE ? "truthy" : "falsy"}
                  content={item}
                />
              </div>
            );
          })}
      </section>
      <div className="absolute right-0 bottom-0 w-[500px]">
        <Timer timer={question.timer} />
      </div>
    </section>
  );
};
