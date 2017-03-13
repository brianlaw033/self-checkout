import { moduleForModel, test } from 'ember-qunit';

moduleForModel('shop', 'Unit | Model | shop', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let shop = this.shop();
  assert.ok(!!model);
});
