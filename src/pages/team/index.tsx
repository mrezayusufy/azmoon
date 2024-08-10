import { TableScore as TableScoreFrames } from "@/components";
import { useAppContext } from "@/contexts";
import { ITeam, ITeamResponse } from "@/interfaces";
import { getTeam } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const Team = () => {
  const {state}= useAppContext();
  const {isLoading, isError, data: response}= useQuery<ITeamResponse>({
    queryKey: ["team", state.code], 
    queryFn: () => getTeam(state.code),
    staleTime: 5000,
  })
  if(isError && !response) return null;
  if(isLoading) return null;
  console.log(response)
  return <section className="flex flex-col justify-end h-full p-5">
    <ul className="flex flex-col gap-0">
      {response?.data.map((item: ITeam) =>
        <li key={item.teamId} className="-mt-3">
          <TableScoreFrames item={item}/>
        </li>
      )}
    </ul>
  </section>
};


 