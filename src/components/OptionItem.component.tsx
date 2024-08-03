import { Option } from "./Option.component";
import { useQuestionStore } from "../store";
import { useAppContext } from "@/contexts";

export const OptionItem = () => {
  const {selectedAnswer, answerChecked, question} = useQuestionStore()
  const { state } = useAppContext();
  let color = '';
  if(answerChecked)
    if(selectedAnswer === question?.correctAnswer) 
      color = "truthy";
    else 
      color = "falsy";
  else 
    color = "selected";
  return <div className="w-[160px]">
    <Option content={state.answer} color={color}/>
  </div>
}