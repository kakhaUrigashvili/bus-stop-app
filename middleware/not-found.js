module.exports = (req, res, next) => {
    if (req.path === '/favicon.ico') {
        next();
    } else {
        res.status(404).send('Not Found');
    }
};
