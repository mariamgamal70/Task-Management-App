const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
require('./database/index'); // Load models and associations
dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173/', 'http://localhost:3000/'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'  ]
}));
app.use(express.json());
app.use(cookieParser());


const authRoutes = require('./routes/auth.routes.js');
const taskRoutes = require('./routes/task.routes.js');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync({ alter: true }); 
        console.log('Tables synchronized.');
        app.listen(3000, () =>     
            console.log(`Server running on port ${process.env.PORT}`)
        );
    } catch (err) {
        console.error('Startup Error:', err);
    }
})();