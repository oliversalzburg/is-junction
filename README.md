is-junction
===========

Determine if a given path resolves to an NTFS junction (reparse point).

```js
const {isJunctionSync} = require(".");
isJunctionSync(path); // returns true or false depending on if the path is a junction.
```
