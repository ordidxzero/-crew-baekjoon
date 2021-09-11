// src에 있는 문제들에 접근하는 함수들을 모아놓은 파일
import fs from 'fs-extra';
import path from 'path';
import { IUserSolvedProblem, SolvedUser } from './types';
const SRC_DIR = path.resolve(__dirname, '../../src');

const getParticipants = () => fs.readdirSync(SRC_DIR);

const userDirPath = (username: string) => ({
  root: path.join(SRC_DIR, username),
  solved: path.join(SRC_DIR, username, 'data/solved.json'),
});

export const integrateUserSolvedProblem = () => {
  const problemAccumulator: IUserSolvedProblem[] = [];
  const userAccumulator: SolvedUser[] = [];
  getParticipants().map(user => {
    const { solved } = userDirPath(user);
    const solvedProblems: IUserSolvedProblem[] = JSON.parse(fs.readFileSync(solved, 'utf-8'));
    solvedProblems.forEach(problem => {
      const solvedUser = userAccumulator.find(u => u.problemId === problem.id);
      if (solvedUser) {
        solvedUser.users.push(user);
      } else {
        userAccumulator.push({ problemId: problem.id, users: [user] });
      }
      const existance = problemAccumulator.find(p => p.id === problem.id);
      if (!existance) {
        return problemAccumulator.push(problem);
      }
    });
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return { solvedProblem: problemAccumulator.map(({ submits, languages, ...rest }) => rest), solvedUser: userAccumulator };
};

export const convertToTotalDataFormat = () => {
  const { solvedProblem, solvedUser } = integrateUserSolvedProblem();
  return solvedProblem.map(p => {
    const data = solvedUser.find(u => u.problemId === p.id);
    if (data) {
      return { ...p, people: data.users };
    }
    return { ...p, people: [] };
  });
};
