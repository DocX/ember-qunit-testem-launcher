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
