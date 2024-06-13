const { createGzip } = require('zlib');
export default function handler(req, res) {
  // I've tried both with and without these headers
  // res.setHeader('Content-Encoding', 'gzip');
  // res.setHeader('Content-Type', 'application/json');
  const gzip = createGzip()
  gzip.pipe(res)
  gzip.write(JSON.stringify({ message: 'fanny fatnugget says hello' }))
  gzip.end();
  res.end();
}
