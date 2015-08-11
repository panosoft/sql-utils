var R = require('ramda');
var is = require('is_js');

var quote = s => '\'' + s + '\'';
var quoteList = R.compose(R.join(','), R.map(quote));
var parenthesize = s => '(' + s + ')';
// 'a' --> 'a'
// [a, b, c] --> '(a AND b AND c)'
// [  [a, b, c], [d, e, f]  ] --> '(a AND b AND c) OR (d AND e AND f)'
var buildCriteria = criteriaArrays => {
	// if null return blank
	if (!criteriaArrays)
		return '';
	// if already a string just return it
	if (is.string(criteriaArrays))
		return criteriaArrays;
	var and = R.compose(parenthesize, R.join(' AND '));
	// check for array of arrays
	if (is.array(criteriaArrays[0]))
		return R.join(' OR ', R.map(and, criteriaArrays));
	else
		return and(criteriaArrays);
};

module.exports = {
	buildCriteria: buildCriteria,
	parenthesize: parenthesize,
	quote: quote,
	quoteList: quoteList
};
