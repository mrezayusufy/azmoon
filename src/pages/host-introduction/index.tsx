import { useEffect } from "react";
import {HostIntro} from "../../components";
import { useFormStore } from "@/store/useFormStore";

export const HostIntroPage = () => {
  let announcer = "";
    useEffect(() => {
      announcer= useFormStore.getState().announcer;
    }, [announcer]);
  return (
    <div className="flex flex-col items-end h-dvh justify-end px-10">
      <HostIntro title={announcer} subtitle="گوینده" />
    </div>
  );
}