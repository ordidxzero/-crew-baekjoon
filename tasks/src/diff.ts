import axios from 'axios';

const PR_AUTHOR = process.env.PR_AUTHOR;
const PR_NUMBER = process.env.PR_NUMBER;

if (PR_AUTHOR === undefined) {
  throw Error('PR_AUTHOR가 없습니다.');
}

const DIFF_URL = `https://github.com/ordidxzero/test-baekjoon/pull/${PR_NUMBER}.diff`;

const getDiffs = new RegExp(`(diff --git)+`);

const mainRoutine = async () => {
  const response = await axios.get<string>(DIFF_URL);
  // response를 개행문자를 기준으로 쪼갬
  const splitResponse = response.data.split('\n');

  // 쪼개진 response 중에서 diff --git로 시작하는 문자열만 골라냄
  const filterOnlyDiff = splitResponse.filter(t => getDiffs.test(t));

  // diff --git에서 변경된 파일의 경로를 얻어냄
  const getDiffFilePath = filterOnlyDiff.map(t => {
    const splitText = t.split(' ');
    return splitText[splitText.length - 1].slice(2);
  });

  const regex = new RegExp(`(src/${PR_AUTHOR}/)+`);

  // 변경된 파일들 중 PR_AUTHOR의 소유가 아닌 파일들
  const filesThatAreNotOwnedByThePRAuthor = getDiffFilePath.filter(p => !regex.test(p));

  if (filesThatAreNotOwnedByThePRAuthor.length > 0) {
    throw Error();
  }
};

mainRoutine().catch(error => {
  console.log(error);
  return process.exit(1);
});
