export default function handler(req, res) {
  res.status(200)
  res.write(JSON.stringify({ message: 'bunnymen say hello' }))
  res.end();
}
