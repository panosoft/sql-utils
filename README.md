# sql-utils

Utilities to assist with SQL script generation.

[![npm version](https://img.shields.io/npm/v/@panosoft/sql-utils.svg)](https://www.npmjs.com/package/@panosoft/sql-utils)
[![npm license](https://img.shields.io/npm/l/@panosoft/sql-utils.svg)](https://www.npmjs.com/package/@panosoft/sql-utils)
[![Travis](https://img.shields.io/travis/panosoft/sql-utils.svg)](https://travis-ci.org/panosoft/sql-utils)
[![David](https://img.shields.io/david/panosoft/sql-utils.svg)](https://david-dm.org/panosoft/sql-utils)
[![npm downloads](https://img.shields.io/npm/dm/@panosoft/sql-utils.svg)](https://www.npmjs.com/package/@panosoft/sql-utils)

## Installation

```sh
npm install @panosoft/sql-utils
```

## Usage

```js
var utils = require('sql-utils');
```

## API

- [`buildCriteria`](#buildCriteria)
- [`parenthesize`](#parenthesize)
- [`quote`](#quote)
- [`quoteList`](#quoteList)
- [`parseOrderColumn`](#parseOrderColumn)
- [`replaceOrderColumns`](#replaceOrderColumns)

---

<a name="buildCriteria"></a>
#### buildCriteria ( criteriaArrays )

Joins an array into a criteria string delimited by `AND`'s and `OR`'s.

__Arguments__

- `criteriaArrays` - An array or an array of arrays to be joined.

__Examples__

```js
var array = ['a', 'b', 'c'];
var criteria = utils.buildCriteria(array);
console.log(criteria); // '(a AND b AND c)'
```

```js
var arrays = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f']
];
var criteria = utils.buildCriteria(arrays);
console.log(criteria); // '((a AND b AND c) OR (d AND e AND f))'
```

---

<a name="parenthesize"></a>
#### parenthesize ( string )

Wraps a string with parenthesis.

__Arguments__

- `string` - A string to wrap.

__Example__

```js
var string = utils.parenthesize('a');
console.log(string); // '(a)'
```

---

<a name="quote"></a>
#### quote ( string )

Wraps a string with single quotes.

__Arguments__

- `string` - A string to wrap.

__Example__

```js
var string = utils.quote('a');
console.log(string); // "'a'"
```

---

<a name="quoteList"></a>
#### quoteList ( strings )

Converts an array of strings to a quoted comma delimited list.

__Arguments__

- `strings` - An array of strings to convert.

__Example__

```js
var string = utils.quoteList(['a', 'b', 'c']);
console.log(string); // "'a','b','c'"
```

---

<a name="parseOrderColumn"/>
#### parseOrderColumn ( orderColumn )

Returns an Array with the orderColumn in index 0 and *optionally* ASC/DESC in index 1.

__Arguments__

- `orderColumn` - A string definining a SQL ordering.

__Examples__

```js
var orderColumn = 'userName ASC';
utils.parseOrderColumn(orderColumn); // ['userName', 'ASC']
```

```js
var orderColumn = 'refNum';
utils.parseOrderColumn(orderColumn); // ['refNum']
```

---

<a name="replaceOrderColumns"/>
#### replaceOrderColumns ( orderColumns, componentColumns )

Takes an Array of Order Columns and replace any column that has components in the Object of Component Columns. This will preserve the ASC/DESC suffix in the original Order Column.

This is VERY useful for replacing a name column with its components, i.e. first, last and middle.

__Arguments__

- `orderColumns` - An Array of Order Columns.
- `componentColumns` - An Object of component columns where the `key` is the order column and the `value` is an Array of component columns.

__Examples__

```js
var orderColumns = ['userName ASC', 'clientName DESC', 'refNum'];
var componentColumns = {
	userName: ['usrLastName', 'usrFirstName', 'usrMI'],
	clientName: ['clientLastName', 'clientFirstName', 'clientMI']
};
var columns = utils.replaceOrderColumns(orderColumns, componentColumns);
console.log(columns);
/*[
	'usrLastName ASC',
	'usrFirstName ASC',
	'usrMI ASC',
	'clientLastName DESC',
	'clientFirstName DESC',
	'clientMI DESC',
	'refNum'
]*/```
