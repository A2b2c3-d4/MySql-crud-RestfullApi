const express = require('express');
const cors = require('cors');
const db = require('./config/db.js'); // Assuming db.js exports a default object
const authRoutes = require('./routes/userRoutes.js'); // Add `.js` extension

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
