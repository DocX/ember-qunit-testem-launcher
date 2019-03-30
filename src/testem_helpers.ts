import { get } from 'superagent';
import { WorkspaceConfiguration } from 'vscode';
const TESTEM_INDEX_PATH = '/tests/index.html';

interface TestemModuleID { moduleId: string; }
interface TestemTestID { testId: string; }
type TestenID = TestemModuleID | TestemTestID;

export function testemUrlFor(ids: TestenID[], configuration: WorkspaceConfiguration) {
  let query = ids.map(id => {
    if ((<TestemModuleID>id).moduleId) { return `moduleId=${(<TestemModuleID>id).moduleId}`; }
    if ((<TestemTestID>id).testId) { return `testId=${(<TestemTestID>id).testId}`; }
  });

  let testemURLSessionId = configuration.get('testemLauncher.testemURLSessionId');
  let testemServerURL = configuration.get('testemLauncher.testemServerURL');
  return `${testemServerURL}/${testemURLSessionId}${TESTEM_INDEX_PATH}?${query.join('&')}`;
}

export async function checkTestemIsRunning(testemServerURL: string) {
  try {
    let result = await get(testemServerURL);
    return result.ok;
  } catch {
    return false;
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitForTestemServer(testemServerURL: string, waitingFn: (ms: number, cancel: () => void) => void, timeout: number = 300000) {
  let keepRunning = true;
  let cancel = () => keepRunning = false;

  while(await checkTestemIsRunning(testemServerURL) !== true) {
    waitingFn(timeout, cancel);
    await sleep(5000);
    timeout -= 5000;
    if (timeout <= 0 || !keepRunning) {
      return false;
    }
  }
  return true;
}
