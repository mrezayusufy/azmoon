import { Api } from "./api"
const api = new Api();
export const getQuestion = async (codeGame: string, orderId: string) => await api.get(`/Game/question?code=${codeGame}&orderId=${orderId}`)