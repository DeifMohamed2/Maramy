const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', (req, res) => {
  res.render('index', { name: 'Maram' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 Server is running on http://localhost:${PORT}`);
  console.log(`💖 Surprise page ready for Maram!`);
});

