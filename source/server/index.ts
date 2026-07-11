// Main Server Initialization File
import express from "express";
import mainRoutes from "./routes/main_routes.js";
const path = require('path');

// Initialize the Express application
const app = express();
const PORT = 5003;

// Serve static assets from the React build directory
const st = path.join(__dirname, "../", "../", 'distr', "client", "dist");
console.log("static: ", st)
app.use(express.static(st));

// Built-in middleware to parse incoming JSON request bodies
app.use(express.json());


// Use Routes from another directory
app.use(mainRoutes);

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