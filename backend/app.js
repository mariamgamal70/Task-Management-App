    const dotenv = require('dotenv');
    const express = require('express');
    const cors = require('cors');
    const sequelize = require('./server.js'); 
const User = require('./database/user.db.js');
const Task = require('./database/task.db.js');
    app.use(cors({
    origin: ['http://localhost:5173/', 'http://localhost:3000/'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'  ]
    }));
    app.use(express.json());


    // const authRoutes = require('./src/Modules/auth/auth.routes.js');
    // const taskRoutes = require('./src/Modules/tasks/task.routes.js');

    // app.use('/auth', authRoutes);
    // app.use('/tasks', taskRoutes);


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