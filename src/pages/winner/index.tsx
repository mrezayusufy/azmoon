import { WinnerComponent } from "@/components"
import { useAppContext } from "@/contexts"

export const WinnerPage = () => {
  const {state} = useAppContext();
  return <WinnerComponent content={state.winner as string}/>
}