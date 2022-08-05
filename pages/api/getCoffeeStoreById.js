import { table, getMinifiedRecords } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        const records = getMinifiedRecords(findCoffeeStoreRecords);
        res.json(records);
      } else {
        res.status(400);
        res.json({ message: `id is missing` });
      }
    }
  } catch (error) {
    res.status(400);
    res.json({ message: `Something went wrong` });
  }
};

export default getCoffeeStoreById;
