const Airtable = require("airtable");
const { hash } = require("../hash");

Airtable.configure({ apiKey: process.env.AIRTABLE_API });

let base;

module.exports = async (req, res) => {
  if (!base) {
    base = Airtable.base("appOWPYNB2wLPeF8j");
  }

  try {
    base("svrlss-pwds").create(
      [{ fields: { hash: await hash(req.body.pwd) } }],
      (err, [record]) => {
        if (err) {
          return res.status(500).end();
        }

        res.json({ id: record.id });
      }
    );
  } catch (error) {
    res.status(500).end();
  }
};
