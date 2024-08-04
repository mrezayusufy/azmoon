import { Option } from "./Option.component";
import { useQuestionStore } from "@/store";
import { useAppContext } from "@/contexts";

export const OptionItem = () => {
  const { state } = useAppContext();
  const {isChecked, answer, question} = state;
  let color = '';
  if(isChecked)
    if(answer === question?.correctAnswer) 
      color = "truthy";
    else 
      color = "falsy";
  else 
    color = "selected";
  return <div className="w-[160px]">
    <Option content={state.answer} color={color}/>
  </div>
}