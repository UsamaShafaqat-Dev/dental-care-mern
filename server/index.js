const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose'); // 1. Mongoose ko import kiya
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/auth', authRoutes);

// 2. Database Connection Logic
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Database connected successfully! ✅"))
    .catch((err) => console.log("Database connection error: ❌", err));

// Test Route
app.get('/', (req, res) => {
    res.send('DentalCare Server is running and connected to DB!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});