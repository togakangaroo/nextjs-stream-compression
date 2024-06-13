const http = require("http");
const zlib = require("zlib");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Encoding": "gzip" });
  const gzip = zlib.createGzip();
  gzip.pipe(res);
  gzip.write("hello world");
  gzip.end();
});

const PORT = 8888;

server.listen(PORT, () => console.log(`started on http://localhost:${PORT}`));
