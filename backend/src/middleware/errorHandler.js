const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: 'Duplicate entry found',
            error: err.message
        });
    }
    if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({
            success: false,
            message: 'Database connection failed'
        });
    }
    if (err.code === 'ERR_ASSERTION') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
};
module.exports = errorHandler;
