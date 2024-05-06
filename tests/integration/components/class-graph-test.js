import { module, test } from 'qunit';
import { setupRenderingTest } from 'student-management/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | class-graph', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ClassGraph />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <ClassGraph>
        template block text
      </ClassGraph>
    `);

    assert.dom().hasText('template block text');
  });
});
