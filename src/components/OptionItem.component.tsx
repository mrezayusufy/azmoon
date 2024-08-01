import { Option } from "./Option.component";
import { useQuestionStore } from "../store";

export const OptionItem = () => {
  const {selectedAnswer, answerChecked, question} = useQuestionStore()

  let color = '';
  if(answerChecked)
    if(selectedAnswer === question?.correctAnswer) 
      color = "truthy";
    else 
      color = "falsy";
  else 
    color = "selected";
  return <div className="w-[160px]">
    <Option content={selectedAnswer} color={color}/>
  </div>
}