const path = require('path');
const express = require('express');
const app = express();
const apiRouter = require('./routers/api');
const PORT = 3000;
const cors = require('cors');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors);

app.use('/api', apiRouter);


app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware',
        status: 500,
        message: {err: 'An error occured'}
    } 
    const errorObj = Object.assign({}, defaultErr, err);
    console.log('why its getting error:', errorObj.log)
    return res.status(errorObj.status).json(errorObj.message)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

module.exports = app;