// data.ts와 problem.ts의 함수를 조합해서 만든 함수들을 모아놓은 파일

import { saveSolvedProblems } from './data';
import { convertToTotalDataFormat } from './problem';
import { convertSolvedProblemsToREADMEData, formatTemplateData, getReadmeTemplate, saveReadme } from './readme';

const mainRoutine = () => {
  const result = convertToTotalDataFormat();
  saveSolvedProblems(result);
  const templateData = getReadmeTemplate();
  const data = convertSolvedProblemsToREADMEData(result);
  const readmeData = formatTemplateData(templateData, data);
  saveReadme(readmeData);
};

mainRoutine();
