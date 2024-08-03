import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { ITeam, ITeamAction, ITeamState } from '../interfaces';
const INITIAL_STATE: ITeamState = {
  teams: [],
}

export const useTeamStore = create<ITeamState & ITeamAction>()(
    (set) => ({
      ...INITIAL_STATE,
      setTeams: (teams: ITeam[]) => set({teams})
    })
);