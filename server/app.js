require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const transactionRoutes = require('./src/routes/transactionRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'FinLens API is running' }));
app.use('/api', transactionRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
