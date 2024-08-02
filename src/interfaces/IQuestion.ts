export interface IQuestion {
  id: number,
  questionType: number,
  content: string,
  timer:  number,
  orderId: number,
  score:  number,
  options: string,
  correctAnswer: string,
  categoryId: number,
  optionsList: string[],
  competitionId: number
}
export interface IQuestionState {
  code: string,
  question: IQuestion | null,
  answer: string,
  selectedAnswer: string,
  answerChecked: boolean,
  orderId: number,
}
export interface IQuestionActions {
  incrementOrderId: () => void,
  reset: () => void,
  setCode: (code: string) => void,
  checkAnswer: () => void,
  setQuestion: (question: IQuestion) => void,
  setAnswer: (text: string) => void,
  setSelectedAnswer: (answer: string) => void,
  setAnswerChecked: (checked: boolean) => void,
  setOrderId: (orderId: number) => void,
}
export interface MainQuestionState extends IQuestionState {
  setCode: (code: string) => void,
  checkAnswer: () => void,
  setQuestion: (question: IQuestion) => void,
  setAnswer: (text: string) => void,
  setSelectedAnswer: (answer: string) => void,
  setAnswerChecked: (checked: boolean) => void,
  setOrderId: (orderId: number) => void,
}
export interface IQuestionStore {
  state: IQuestionState,
  actions: IQuestionActions,
}
 
