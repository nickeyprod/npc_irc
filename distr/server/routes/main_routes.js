import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
// __filename and __dirname is not defined in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
// Handle any routing requests by sending the React index.html file
router.get('/{*splat}', async (req, res) => {
    // Path to React index.html file
    const index = path.join(__dirname, "../", "../", 'client', 'build', 'index.html');
    res.sendFile(index);
});
export default router;
