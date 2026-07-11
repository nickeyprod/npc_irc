"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Main Server Initialization File
const express_1 = __importDefault(require("express"));
const main_routes_js_1 = __importDefault(require("./routes/main_routes.js"));
const path = require('path');
// Initialize the Express application
const app = (0, express_1.default)();
const PORT = 5003;
// Serve static assets from the React build directory
const st = path.join(__dirname, "../", "../", 'distr', "client", "build");
console.log("static: ", st);
app.use(express_1.default.static(st));
// Built-in middleware to parse incoming JSON request bodies
app.use(express_1.default.json());
// Use Routes from another directory
app.use(main_routes_js_1.default);
// Custom middleware for logging requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next(); // Pass control to the next handler
});
// 4. Catch-all middleware for 404 (Not Found) handling
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});
// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`[NPC IRS] App is now running at http://localhost:${PORT}`);
});
