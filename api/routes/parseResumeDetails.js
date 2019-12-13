const saveResumeDetails = require("../services/parseResumeDetails/parseResumeDetails");

const parseResumeDetails = async (req, res) => {
  try {
    const result = await saveResumeDetails();
    res.json({ data: result });
  } catch (e) {
    res.json({ message: e.message });
  }
};

module.exports = parseResumeDetails;
