"use strict";

const fs = require("fs");
const os = require("os");

module.exports = {
  isJunction: path => {
    // We call lstat first, regardless of the platform, to cause
    // ENOENT scenarios, and other common errors, to be handled
    // consistently cross-platform.
    fs.lstatSync(path);

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
};
