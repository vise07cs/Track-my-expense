const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/userModel');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/signup', userRoutes);

// Sync DB

const PORT = 5000;


sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synchronized'))
  .catch(err => console.log('❌ Sync failed', err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
