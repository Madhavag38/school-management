const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');
const errorHandler = require('./middleware/errorHandler');
const app = express();
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.get('/', (req, res) => {
    res.json({
        message: 'School Management API',
        endpoints: {
            addSchool: 'POST /api/schools/add',
            listSchools: 'GET /api/schools/list?latitude=xx&longitude=yy',
            getSchoolById: 'GET /api/schools/:id'
        }
    });
});
app.use('/api/schools', schoolRoutes);
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);
module.exports = app;
