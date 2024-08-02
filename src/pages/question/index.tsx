import { useQuery } from "@tanstack/react-query";
import { Question } from "../../components";
import { getQuestion } from "../../services"
import { useQuestionStore } from "../../store/useQuestionStore";

export const QuestionPage = () => {
  const { code, orderId } = useQuestionStore();
  const {
    data: response,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["question", code, orderId],
    queryFn: () => getQuestion(code, orderId.toString()),
    staleTime: 5000,
  });

  if (isError) return <div></div>;
  if (isLoading) return <div></div>;

  return (
    <div className="flex flex-col items-center align-bottom justify-end h-dvh w-full ">
      <Question question={response.data} />
    </div>
  );
}