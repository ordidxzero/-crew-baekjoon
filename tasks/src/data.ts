import fs from 'fs-extra';
import path from 'path';
import { ISolvedProblem } from './types';

const DATA_DIR = path.resolve(__dirname, '../data');

const SOLVED_PROBLEM_JSON = path.join(DATA_DIR, 'solved.json');

export const saveSolvedProblems = (data: ISolvedProblem[]): void => {
  const sortedData = data.sort((prev, cur) => prev.id - cur.id);
  fs.writeFileSync(SOLVED_PROBLEM_JSON, JSON.stringify(sortedData, null, 2), { encoding: 'utf-8' });
  return;
};
