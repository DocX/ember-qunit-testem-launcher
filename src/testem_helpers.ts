import { get } from 'superagent';

const TESTEM_BASE_URL = 'http://localhost:7357/tests/index.html';

interface TestemModuleID { moduleId: string; }
interface TestemTestID { testId: string; }
type TestenID = TestemModuleID | TestemTestID;

export function testemUrlFor(ids: TestenID[]) {
  let query = ids.map(id => {
    if ((<TestemModuleID>id).moduleId) { return `moduleId=${(<TestemModuleID>id).moduleId}`; }
    if ((<TestemTestID>id).testId) { return `testId=${(<TestemTestID>id).testId}`; }
  });

  return `${TESTEM_BASE_URL}?${query.join('&')}`;
}

export async function checkTestemIsRunning() {
  try {
    let result = await get(TESTEM_BASE_URL);
    return result.ok;
  } catch {
    return false;
  }
}

export async function waitForTestemServer() {
  //TODO
}
