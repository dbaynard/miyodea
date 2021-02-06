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
  }

  return pkg;
}
