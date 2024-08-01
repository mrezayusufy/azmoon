export interface ITeam {
  teamId: number;
  name: string;
  members: string;
  info: string;
  score: number;
  membersArray: string[]; // Assuming membersArray is an array of strings
}
export interface ITeamState {
  teams: ITeam[],
}
export interface ITeamAction {
  setTeams: (teams: ITeam[]) => void,
}
export interface ITeamResponse {
  success: boolean;
  message: string;
  data: ITeam[];
}