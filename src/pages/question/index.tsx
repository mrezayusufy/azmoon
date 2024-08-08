import { useQuery } from "@tanstack/react-query";
import { Question } from "@/components";
import { getQuestion } from "@/services"
import { useAppContext } from "@/contexts";
import { useEffect } from "react";
export const QuestionPage = () => {
  useEffect(() => {
      document.title = "سوالات"
  }, [])
  const {state}= useAppContext();
  const {
    data,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["question", state.code, state.orderId],
    queryFn: () => getQuestion(state.code, state.orderId.toString()),
    staleTime: 5000,
  });
  
  if (isError && !data) return null;
  if (isLoading) return null;

  return (
    <div className="flex flex-col items-center align-bottom justify-end h-full w-full ">
      <Question question={data.data} />
    </div>
  );
}