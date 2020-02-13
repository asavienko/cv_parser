const query = require("querystring");
const countTotalCvs = require("../../services/parser/countTotalCvs");

const totalCvs = async (req, res) => {
  const queryString = query.stringify(req.query);
  const foundCvs = await countTotalCvs(queryString);
  res.json({ confirmation: "success", data: foundCvs });
};

module.exports = totalCvs;
