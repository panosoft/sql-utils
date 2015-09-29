var utils = require('../lib');
var expect = require('chai').expect;

describe('buildCriteria', function () {
	it('return blank if null', function () {
		var criteria = utils.buildCriteria(null);
		expect(criteria).to.equal('');
	});
	it('identity if string', function () {
		var criteria = utils.buildCriteria('a');
		expect(criteria).to.equal('a');
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

describe('parseOrderColumn', function () {
	it('parses the Order Column to separate out the ASC/DESC portion from the column name', function () {
		var orderColumn = 'userName ASC';
		expect(utils.parseOrderColumn(orderColumn)).to.have.members(['userName', 'ASC']);
	});
});

describe('replaceOrderColumns', function () {
	it('replace order columns with their component columns preserving the ASC/DESC portion', function () {
		var orderColumns = ['userName ASC', 'clientName DESC', 'refNum'];
		var componentColumns = {
			userName: ['usrLastName', 'usrFirstName', 'usrMI'],
			clientName: ['clientLastName', 'clientFirstName', 'clientMI']
		};
		expect(utils.replaceOrderColumns(orderColumns, componentColumns)).to.have.members([
			'usrLastName ASC',
			'usrFirstName ASC',
			'usrMI ASC',
			'clientLastName DESC',
			'clientFirstName DESC',
			'clientMI DESC',
			'refNum'
		]);
	});
});
