is-junction
===========

Determine if a given path resolves to an NTFS junction (reparse point).

```js
const { isJunction, isJunctionSync } = require( "is-junction" );

isJunctionSync( path ); // returns true or false depending on if the path is a junction.

isJunction( path, ( error, result ) => {
	// `result` is true or false depending on if the path is a junction.
} );
```
