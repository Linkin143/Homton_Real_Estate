const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./src/config/db');
const corsMiddleware = require('./src/middleware/cors');
const errorHandler = require('./src/middleware/errorHandler');
const propertyRoutes = require('./src/routes/propertyRoutes');
const inquiryRoutes = require('./src/routes/inquiryRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Core Middleware ───────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Homton Real Estate API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🏛️  Homton Real Estate API`);
  console.log(`🚀  Server running on http://localhost:${PORT}`);
  console.log(`🌍  Environment: ${process.env.NODE_ENV}\n`);
});
