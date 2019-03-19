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

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitForTestemServer(timeout: number = 300000) {
  while(await checkTestemIsRunning() !== true) {
    console.log("Waiting for testem server to run...");
    await sleep(100);
    timeout -= 100;
    if (timeout <= 0) {
      return false;
    }
  }
  return true;
}
