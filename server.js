const express = require('express');
const cors = require('cors');
const db = require('./config/db.js');
const authRoutes = require('./routes/userRoutes.js'); 

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
