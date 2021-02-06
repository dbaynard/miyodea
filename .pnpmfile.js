"use strict";

module.exports = {
  hooks: { readPackage },
};

function readPackage(pkg, context) {
  switch (pkg.name) {
    case "@testing-library/user-event":
      pkg.dependencies = {
        ...pkg.dependencies,
        "@testing-library/dom": "^7.21.4",
      };
      break;
    case "bootstrap":
      if pkg.version.startsWith('4.6') {
      pkg.peerDependencies = {
        ...pkg.peerDependencies,
        "jquery": "1.9.1",
        "popper-js": "^1.16.1",
      };
      }
      break;
  }

  return pkg;
}
