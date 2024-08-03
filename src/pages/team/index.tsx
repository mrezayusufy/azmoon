import { TableScore as TableScoreFrames } from "@/components";
import { useAppContext } from "@/contexts";
import { ITeam } from "@/interfaces";
import { getTeam } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const Team = () => {
  const {state}= useAppContext();
  const {isLoading, isError, data}= useQuery({
    queryKey: ["team", state.code], 
    queryFn: () => getTeam(state.code),
    staleTime: 5000,
  })
  if(isError && !data) return null;
  if(isLoading) return null;
  return <section className="flex flex-col justify-end h-full p-3">
    <ul className="flex flex-col gap-0">
      {data.data.map((item: ITeam) =>
        <li key={item.teamId} className="-mt-3">
          <TableScoreFrames item={item}/>
        </li>
      )}
    </ul>
  </section>
};
