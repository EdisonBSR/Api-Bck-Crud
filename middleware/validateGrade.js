const isNumber = async function (req, res) {
  const num = parseInt(req.body.name);
  console.log(!isNaN(num));
};
