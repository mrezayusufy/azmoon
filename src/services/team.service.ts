import { Api } from "./api"
const api = new Api();
export const getTeam = async (codeGame: string) => await api.get(`/Game/teams?code=${codeGame}`)