import { module, test } from 'qunit';
import { setupRenderingTest } from 'student-management/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | grade-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<GradeTable />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <GradeTable>
        template block text
      </GradeTable>
    `);

    assert.dom().hasText('template block text');
  });
});
