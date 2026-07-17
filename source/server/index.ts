// Main Server Initialization File
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// __filename and __dirname is not defined in ES module scope
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// Importing routes
import reactRoutes from "./routes/react_routes.js";
import vacancyAPIRoutes from "./routes/API/vacancy_routes.js";
import candidateAPIRoutes from "./routes/API/candidate_routes.js";

// Initialize the Express application
const app = express();
const PORT = 5003;

// Serve static assets from the React build directory
app.use(express.static(path.join(__dirname, "../", "../", 'distr', "client", "build")));

// Built-in middleware to parse incoming JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Use Routes from another directory
app.use("/api", vacancyAPIRoutes);
app.use("/api", candidateAPIRoutes);
app.use(reactRoutes);

// Custom middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next(); // Pass control to the next handler
});

// Catch-all middleware for 404 (Not Found) handling
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`[NPC IRS] App is now running at http://localhost:${PORT}`);
});