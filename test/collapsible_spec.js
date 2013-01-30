'use strict'

var assert = require('timoxley-assert');
var collapsible = require('collapsible');

it('simple case', function(){
  assert.deepEqual(collapsible([['a', 1], ['b', 2], ['c', 3]], 2), [['a', 'b'], ['c']]);
});

it('slightly complicated case', function(){
  assert.deepEqual(collapsible([['a', 1], ['b', 2], ['c', 3]], 1), [['a', 'b', 'c']]);
})

it('complicated case', function(){
  assert.deepEqual(collapsible([['a', 1], ['b', 2], ['c', 3], ['d', 2]], 2), [['a', 'b'], ['c', 'd']]);
})
