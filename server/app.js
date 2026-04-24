require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const transactionRoutes = require('./src/routes/transactionRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

connectDB().catch((err) => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'FinLens API is running' }));
app.use('/api', transactionRoutes);

app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
