import { Api } from "./api"
const api = new Api();
export const getTeam = async (codeGame: string) => await api.get(`/Game/teams?code=${codeGame}`)
export const postScore = async (code: string, teamId: string, score: string) => await api.post(`/Game/updateScore?code=${code}&teamId=${teamId}&score=${score}`, {})