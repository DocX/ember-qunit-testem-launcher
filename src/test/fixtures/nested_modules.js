import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

// moduleId: cca93cea
module('module example', function(hooks) {
  setupApplicationTest(hooks);

  module('submodule 1', function(hooks) {
    test('test example with same name', async function(assert) {
      assert.ok(1 == 1);
    });
  });

  module('submodule 2', function(hooks) {
    test('test example with same name', async function(assert) {
      assert.ok(1 == 1);
    });
  });
});

module('another root module', function(hooks) {
  setupApplicationTest(hooks);

  test('test example with same name', async function(assert) {
    assert.ok(1 == 1);
  });
});
