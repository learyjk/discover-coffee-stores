var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    res.json({ message: "POST request received" });
  } else {
    const findCoffeeStoreRecores = await table
      .select({
        filterByFormula: `id=0`,
      })
      .firstPage();

    if (findCoffeeStoreRecores) {
      res.json(findCoffeeStoreRecores);
    } else {
      res.json({ message: "No record, create it!" });
    }
  }
};

export default createCoffeeStore;
