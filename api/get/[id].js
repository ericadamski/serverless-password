const Airtable = require("airtable");
const { compare } = require("../../hash");

Airtable.configure({ apiKey: process.env.AIRTABLE_API });

let base;

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", ["OPTIONS", "POST"]);
  res.setHeader("Access-Control-Allow-Headers", [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  ]);

  if (req.method === 'OPTIONS') {
    return res.end()
  } else if (req.method !== "POST") {
    return res.status(405).end()
  }

  if (!base) {
    base = Airtable.base("appOWPYNB2wLPeF8j");
  }

  try {
    base("svrlss-pwds").find(req.query.id, async (err, record) => {
      if (err) {
        return res.status(500).end();
      }

      res.json({
        valid: await compare(req.body.pwd, record.fields.hash)
      });
    });
  } catch (error) {
    res.status(500).end();
  }
};
