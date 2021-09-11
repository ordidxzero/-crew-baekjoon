export interface MetaData {
  language: string;
  filename: string;
}

export interface SolvedUser {
  problemId: number;
  users: string[];
}

export interface IUserSolvedProblem {
  id: number;
  title: string;
  baekjoonUrl: string;
  level: number;
  languages: string[];
  submits: MetaData[];
}

export interface ISolvedProblem {
  id: number;
  title: string;
  baekjoonUrl: string;
  level: number;
  people: string[];
}

export interface IProblemSubmit {
  id: number;
  baekjoonUrl: string;
  languages: string[];
}

export interface ThreeKindOfProblem {
  solvedIDs: number[];
  newSolvedIDs: number[];
  ghostSolvedIDs: number[];
}
