import { useAppContext } from "@/contexts";
import { Team, QuestionPage, HostIntroPage, Scores, WinnerPage } from "../index";

export const StarterPage = () => {
  const { state: {starter: {IsAnnouncer, IsQuestion,IsScore,IsWinner}} } = useAppContext();

  return (
    <>
      {IsAnnouncer && <HostIntroPage />}
      {IsScore && <Team />}
      {IsQuestion && <QuestionPage />}
      {IsScore && <Scores />}
      {IsWinner && <WinnerPage />}
    </>
  );
};