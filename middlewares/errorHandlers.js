const {logEvents} = require('../middlewares/logEvents');

exports.errorHandler = (err, req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url} ${err.name}:\t${err.message}`, 'errorLogs.txt');
    
    // Write a fucntion to send mail incase an error occures
    res.sendStatus(500);
}