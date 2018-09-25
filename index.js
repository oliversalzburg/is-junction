"use strict";

const fs = require("fs");
const os = require("os");

function checkPath(path) {
  // Call into native WinAPI to determine specific file attributes.
  if (os.platform() === "win32") {
    const Win32NativeImpl = require("./build/Release/is-junction");
    return Win32NativeImpl.isJunction(path);
  }

  // Junctions are a Windows-specific feature. Whatever relies on this
  // detection should get a clear indication that the path can not be
  // and is not a junction.
  return false;
}

module.exports = {
  isJunction: (path, cb) => {
    // We call lstat first, regardless of the platform, to cause
    // ENOENT scenarios, and other common errors, to be handled
    // consistently cross-platform.
    fs.lstat(path, error => {
      if (error) {
        cb(error, false);
        return;
      }

      try {
        const pathIsJunction = checkPath(path);
        cb(null, pathIsJunction);

      } catch (error) {
        cb(error, false);
      }
    });
  },

  isJunctionSync: path => {
    // We call lstat first, regardless of the platform, to cause
    // ENOENT scenarios, and other common errors, to be handled
    // consistently cross-platform.
    fs.lstatSync(path);

    return checkPath(path);
  }
};
