"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-sanitize@6.0.0";
exports.ids = ["vendor-chunks/rehype-sanitize@6.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/rehype-sanitize@6.0.0/node_modules/rehype-sanitize/lib/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/.pnpm/rehype-sanitize@6.0.0/node_modules/rehype-sanitize/lib/index.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeSanitize)\n/* harmony export */ });\n/* harmony import */ var hast_util_sanitize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-sanitize */ \"(ssr)/./node_modules/.pnpm/hast-util-sanitize@5.0.2/node_modules/hast-util-sanitize/lib/index.js\");\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast-util-sanitize').Schema} Schema\n */\n\n\n\n/**\n * Sanitize HTML.\n *\n * @param {Schema | null | undefined} [options]\n *   Configuration (optional).\n * @returns\n *   Transform.\n */\nfunction rehypeSanitize(options) {\n  /**\n   * @param {Root} tree\n   *   Tree.\n   * @returns {Root}\n   *   New tree.\n   */\n  return function (tree) {\n    // Assume root in -> root out.\n    const result = /** @type {Root} */ ((0,hast_util_sanitize__WEBPACK_IMPORTED_MODULE_0__.sanitize)(tree, options))\n    return result\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vcmVoeXBlLXNhbml0aXplQDYuMC4wL25vZGVfbW9kdWxlcy9yZWh5cGUtc2FuaXRpemUvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxhQUFhLHFCQUFxQjtBQUNsQyxhQUFhLHFDQUFxQztBQUNsRDs7QUFFMkM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMkJBQTJCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixNQUFNLElBQUksNERBQVE7QUFDaEQ7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL3dlYi9ub2RlX21vZHVsZXMvLnBucG0vcmVoeXBlLXNhbml0aXplQDYuMC4wL25vZGVfbW9kdWxlcy9yZWh5cGUtc2FuaXRpemUvbGliL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QtdXRpbC1zYW5pdGl6ZScpLlNjaGVtYX0gU2NoZW1hXG4gKi9cblxuaW1wb3J0IHtzYW5pdGl6ZX0gZnJvbSAnaGFzdC11dGlsLXNhbml0aXplJ1xuXG4vKipcbiAqIFNhbml0aXplIEhUTUwuXG4gKlxuICogQHBhcmFtIHtTY2hlbWEgfCBudWxsIHwgdW5kZWZpbmVkfSBbb3B0aW9uc11cbiAqICAgQ29uZmlndXJhdGlvbiAob3B0aW9uYWwpLlxuICogQHJldHVybnNcbiAqICAgVHJhbnNmb3JtLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWh5cGVTYW5pdGl6ZShvcHRpb25zKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1Jvb3R9IHRyZWVcbiAgICogICBUcmVlLlxuICAgKiBAcmV0dXJucyB7Um9vdH1cbiAgICogICBOZXcgdHJlZS5cbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiAodHJlZSkge1xuICAgIC8vIEFzc3VtZSByb290IGluIC0+IHJvb3Qgb3V0LlxuICAgIGNvbnN0IHJlc3VsdCA9IC8qKiBAdHlwZSB7Um9vdH0gKi8gKHNhbml0aXplKHRyZWUsIG9wdGlvbnMpKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/rehype-sanitize@6.0.0/node_modules/rehype-sanitize/lib/index.js\n");

/***/ })

};
;