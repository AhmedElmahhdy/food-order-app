"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
var express_1 = require("express");
var routes_js_1 = require("./routes.js");
function createApp() {
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/api", routes_js_1.routes);
    return app;
}
