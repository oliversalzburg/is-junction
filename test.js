"use strict";

const assert = require("assert");

const {isJunction} = require(".");
assert.strictEqual(isJunction("test\\junction-folder"), true);
assert.strictEqual(isJunction("test\\symlink-folder"), false);
assert.strictEqual(isJunction("test\\symlink-file"), false);
assert.strictEqual(isJunction("test\\folder"), false);
assert.strictEqual(isJunction("test\\file"), false);
assert.throws(() => isJunction("test\\invalid"));
