import { module, test } from 'qunit';
import { setupTest } from 'student-management/tests/helpers';

module('Unit | Route | grades', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:grades');
    assert.ok(route);
  });
});
