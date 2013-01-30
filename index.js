'use strict'
var min = require('min');

module.exports = function collapse(keyScorePairs, numSlots) {
  function addCurrentAndNext(current, index, array) {
    var next = array[index + 1] || [];
    return current[1] + next[1];
  }

  function getKeys(current, index, array) {
    return current[0];
  }

  function flatten(element) {
    var before = [];
    var after = [];
    var current = [];
    var flattenElement;

    for(var i=0; i<element.length; i++){
      var e = element[i];
      if(!Array.isArray(e)){
        before.push(e)
      }else {
        current = e;
        after = element.slice(i+1);
        break;
      }
    }

    flattenElement = before.concat(current).concat(after);
    if(flattenElement.length == element.length)
      return flattenElement;
    else
      return flatten(flattenElement);
  }

  var pairSums = keyScorePairs.map(addCurrentAndNext);
  pairSums.pop(); //get rid of the NaN at the end

  var minSum = min(pairSums);
  var start = pairSums.indexOf(minSum);
  var next = start + 1;

  var keys = keyScorePairs.map(getKeys);
  keys.splice(start, 2, [keys[start], keys[next]]);

  if(keys.length == numSlots){
    return keys.map(flatten)
  }
  else{
    keyScorePairs.splice(start, 2, [keys[start], minSum]);
    return collapse(keyScorePairs, numSlots);
  }
}
