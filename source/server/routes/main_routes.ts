import express from "express";

const router = express.Router();
const path = require('path');


// GET / [Main Page of the App] 
// router.get('/', (req, res) => {
//   res.send('Welcome to the Express.js Home Page!');
// });

// Handle any routing requests by sending the React index.html file
router.get('/{*splat}', (req, res) => {

   // Path to React index.html file
    const index = path.join(__dirname, "../", "../", 'client', 'dist', 'index.html');
    res.sendFile(index);
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

export default router