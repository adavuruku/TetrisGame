function start_html_server() {
    const http = require('http');
    const fs = require('fs'); 
    const hostname = '0.0.0.0';
    const port = 8080;
    http.createServer(function(request, response) {
        response.writeHeader(200, {
            "Content-Type": "text/html"
        });
        html = fs.readFileSync('./index.html', 'utf8');
        response.write(html);
        response.end();
    }).listen(8081);

    console.log('Server running at http://127.0.0.1:8081/');
} 


start_html_server();