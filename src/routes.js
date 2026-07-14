"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var health_js_1 = require("./app/health.js");
exports.routes = (0, express_1.Router)();
// use module routes here
exports.routes.use("/health", health_js_1.healthRoute);
