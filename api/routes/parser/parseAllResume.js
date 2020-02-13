const saveAllResume = require("../../services/parser/saveAllResume/getResumeFromPages");

const parseAllResume = async (req, res) => {
  try {
    const result = await saveAllResume();
    res.json({ data: result });
  } catch (e) {
    res.json({ message: e.message });
  }
};

module.exports = parseAllResume;
