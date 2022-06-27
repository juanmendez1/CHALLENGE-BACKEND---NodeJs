module.exports = (err, _, res, __) => {
  let { status, message } = err;
  status = status ?? 500;
  res.status(status).json({ message });
  console.error(err);
};
