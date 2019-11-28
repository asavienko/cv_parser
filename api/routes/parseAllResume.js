const saveAllResume = require("../services/saveAllResume/saveAllResume");

const parseAllResume = async (req, res) => {
  try {
    const result = await saveAllResume();
    res.json({ data: result });
  } catch (e) {
    res.json({ message: e.message });
  }
};

module.exports = parseAllResume;
