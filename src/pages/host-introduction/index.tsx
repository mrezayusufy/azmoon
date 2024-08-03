import {HostIntro} from "@/components";
import { useAppContext } from "@/contexts";

export const HostIntroPage = () => {
  const {state} = useAppContext();
  return (
    <div className="flex flex-col items-end h-full justify-end px-10">
      <HostIntro title={state.announcer} subtitle="گوینده" />
    </div>
  );
}