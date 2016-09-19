var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/api/index');
var jobs = require('./routes/api/jobs');

var app = express();

var http = require('http');

var server = app.listen(8000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

var io = require('socket.io').listen(server);
server.listen(8000);


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


// static routes
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/templates', express.static(__dirname + '/views/templates/'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/v1/', jobs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
