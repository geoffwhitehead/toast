var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var http = require('http');
var server = app.listen(8000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
var io = require('socket.io').listen(server);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


server.listen(8000);

mongoose.connect('mongodb://localhost/toast', function(err){ if (err) console.error(err)});

// io
io.set("origins", "*:*");
var currentPrice = 0.00;
io.on('connection', function (socket) {
    socket.emit('priceUpdate',currentPrice);
    socket.on('bid', function (data) {
        currentPrice = parseInt(data);
        socket.emit('priceUpdate',currentPrice);
        socket.broadcast.emit('priceUpdate',currentPrice);
    });
});


/**
 * Routes
 */

app.use('/api/v1', require('./routes/api')(express));

/**
 * No routes match, attempt to serve static content
 */

app.use(express.static(path.join(__dirname, '../client')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
