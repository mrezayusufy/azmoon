import React, { useEffect, useMemo } from "react";
import { Option } from "./Option.component";
import { IQuestion } from "@/interfaces";
import { QuestionItem } from "./QuestionItem.component";
import { Timer } from "./Timer.component";
import { cn } from "@/utils";
import { OptionItem } from "./OptionItem.component";
import { useAppContext } from "@/contexts"; 
import { ScoreComponent } from "./Score/Score.component";

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

  const getColor = (item: string) => {
    if (Boolean(state.isChecked)) {
      if (item === question.correctAnswer) return "truthy";
      if (item === state.answer) return "falsy";
    } else if (item === state.answer) return "selected";
    return "";
  };
  const opt = [OPTION_ENUM.FLASE, OPTION_ENUM.TRUE];
  return (
    <section className="w-[500px] mb-10 flex flex-col gap-y-4 justify-center">

      <section className="flex flex-wrap gap-3 items-center justify-center">
        <QuestionItem content={question.content} />
        {question?.questionType === 0 && state.answer.length > 0 && <OptionItem />}
        {question?.questionType === 2 &&
          question.options.split("،").map((item: string) => { 
            return (
              <div className="w-[160px]" key={item}>
                <Option content={item} color={getColor(item)} />
              </div>
            );
          })}
        {question?.questionType === 1 &&
          opt.map((item) => { 
            return (
              <div
                key={item}
                className={cn("transition-all duration-300")}
              >
                <Option
                  color={getColor(item)}
                  content={item}
                />
              </div>
            );
          })}
      </section>
      <div className="absolute right-0 bottom-0 w-[500px]">
        <Timer timer={question.timer} />
      </div>
      <div className="absolute right-0 bottom-0 w-[500px]">
        <ScoreComponent content={state.score} />
      </div>
    </section>
  );
};
