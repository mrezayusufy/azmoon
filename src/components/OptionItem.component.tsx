import { cn } from "@/utils";
import { Option } from "./Option.component";
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
  return <div className={cn("w-[160px]", state.answer.length > 0 ? "visible" : "invisible")}>
    <Option content={state.answer} color={color}/>
  </div>
}