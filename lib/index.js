var R = require('ramda');
var Ru = require('@panosoft/ramda-utils');
var is = require('is_js');

var sqlUtils = {
	quote: s => '\'' + s + '\'',
	parenthesize: s => '(' + s + ')',
	// 'a' --> 'a'
	// [a, b, c] --> '(a AND b AND c)'
	// [  [a, b, c], [d, e, f]  ] --> '(a AND b AND c) OR (d AND e AND f)'
	buildCriteria: criteriaArrays => {
		// if null return blank
		if (!criteriaArrays)
			return '';
		// if already a string just return it
		if (is.string(criteriaArrays))
			return criteriaArrays;
		var and = R.compose(sqlUtils.parenthesize, R.join(' AND '));
		// check for array of arrays
		if (is.array(criteriaArrays[0]))
			return R.join(' OR ', R.map(and, criteriaArrays));
		else
			return and(criteriaArrays);
	},
	parseOrderColumn: col => Ru.matchGroups(/^(.+?)(?:\s+(ASC|DESC)\s*)?$/i, col)[0],
	replaceOrderColumns: (columns, componentColumns) => {
		var newOrderColumns = [];
		R.forEach(orderCol => {
			var matches = sqlUtils.parseOrderColumn(orderCol);
			var cols = componentColumns[matches[0]];
			if (cols)
				R.forEach(c => newOrderColumns.push(c + (matches[1] ? ' ' + matches[1] : '')), cols);
			else
				newOrderColumns.push(orderCol);
		}, columns);
		return newOrderColumns;
	}
};

sqlUtils = R.merge(sqlUtils, {
	quoteList: R.compose(R.join(','), R.map(sqlUtils.quote))
});

module.exports = sqlUtils;
