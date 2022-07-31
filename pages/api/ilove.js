export default function ilove(req, res) {
  if (!req.query.breed) res.send(500);
  res.status(200).json({ message: `I love ${req.query.breed}` });
}
