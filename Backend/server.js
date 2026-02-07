import dotenv from 'dotenv';
dotenv.config();
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Token Orbit API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/lpassport', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/renewpassport', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/visa', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/termination', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/legal', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/distress', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/cultural', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/employment', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/document', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/calamity', (req, res) => {
  res.json({ 
    status: 'hi',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 handler: kind of like an else block!
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found :(((',
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API: http://localhost:${PORT}`);
});
