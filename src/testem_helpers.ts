const TESTEM_BASE_URL = 'http://localhost:7357';
const TESTEM_INDEX_PATH = '/tests/index.html';

interface TestemModuleID { moduleId: string; }
interface TestemTestID { testId: string; }
type TestenID = TestemModuleID | TestemTestID;

export function testemUrlFor(ids: TestenID[]) {
  let query = ids.map(id => {
    if ((<TestemModuleID>id).moduleId) { return `moduleId=${(<TestemModuleID>id).moduleId}`; }
    if ((<TestemTestID>id).testId) { return `testId=${(<TestemTestID>id).testId}`; }
  });

  let testBrowserId = 1111;

  return `${TESTEM_BASE_URL}/${testBrowserId}{${TESTEM_INDEX_PATH}?${query.join('&')}`;
}
