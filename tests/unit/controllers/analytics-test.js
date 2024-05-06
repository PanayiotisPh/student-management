import { module, test } from 'qunit';
import { setupTest } from 'student-management/tests/helpers';

module('Unit | Controller | analytics', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:analytics');
    assert.ok(controller);
  });
});
