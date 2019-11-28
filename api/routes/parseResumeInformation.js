const saveResumeInformation = require("../services/parseResumeInformation/parseResumeInformation");

const parseResumeInformation = async (req, res) => {
  try {
    const result = await saveResumeInformation();
    res.json({ data: result });
  } catch (e) {
    res.json({ message: e.message });
  }
};

module.exports = parseResumeInformation;
