const { createGzip } = require('zlib');
export default function handler(req, res) {
  res.status(200)
  const gzip = createGzip()
  gzip.pipe(res)
  gzip.write(JSON.stringify({ message: 'fanny fatnugget says hello' }))
  gzip.end();
  res.end();
}
