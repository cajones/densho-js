var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var siteRoot = process.cwd();
var defaultDocument = "index.html";

http.createServer(function(request, response) {
    var uri = (request.url != "/") ? url.parse(request.url).pathname : defaultDocument;
    
    var filename = path.join(siteRoot, uri);
    path.exists(filename, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(process.env.C9_PORT, "0.0.0.0");

sys.puts("Server running ...");