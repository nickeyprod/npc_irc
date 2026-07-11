"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET / [Main Page of the App] 
router.get('/', (req, res) => {
    res.send('Welcome to the Express.js Home Page!');
});
// POST /api/data
router.post('/api/data', (req, res) => {
    const receivedData = req.body;
    if (!receivedData.item) {
        return res.status(400).json({ error: 'Missing required property "item"' });
    }
    res.json({
        message: 'Data successfully received!',
        yourData: receivedData
    });
});
