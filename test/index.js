var utils = require('../lib');
var expect = require('chai').expect;

describe('buildCriteria', function () {
  it('return blank if null', function () {
    var criteria = utils.buildCriteria(null);
    expect(criteria).to.equal('');
  });
  it('identity if string', function () {
    var criteria = utils.buildCriteria('string');
    expect(criteria).to.equal('string');
  });
  it('join AND\'s', function () {
    var array = ['a', 'b', 'c'];
    var criteria = utils.buildCriteria(array);
    expect(criteria).to.equal('(a AND b AND c)');
  });
  it('join OR\'s', function () {
    var arrays = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f']
    ];
    var criteria = utils.buildCriteria(arrays);
    expect(criteria).to.equal('(a AND b AND c) OR (d AND e AND f)');
  });
});

describe('parenthesize', function () {
  it('wrap string with parenthesis', function () {
    var string = utils.parenthesize('a');
    expect(string).to.equal('(a)');
  });
});

describe('quote', function () {
  it('wrap string with quotes', function () {
    var string = utils.quote('a');
    expect(string).to.equal('\'a\'');
  });
});

describe('quoteList', function () {
  it('join array and wrap with quotes', function () {
    var array = ['a', 'b', 'c'];
    var string = utils.quote(array);
    expect(string).to.equal('\'a,b,c\'');
  });
});
