// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];
var server = http.createServer(function (req, res) {
    var parseURL = url.parse(req.url);
    var pathName = parseURL.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('file not exist');
            } else {
                res.end(data);
            }
        });
    } else if (pathName === '/comment') {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            var comment = querystring.parse(data).comment;
            comments.push(comment);
            res.end(JSON.stringify(comments));
        });
    } else {
        fs.readFile('.' + pathName, function (err, data) {
            if (err) {
                console.log(err);
                res.end('file not exist');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(3000, function () {
    console.log('listening on 3000');
});