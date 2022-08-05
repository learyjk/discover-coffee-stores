import { findRecordByFilter } from "../../lib/airtable";

const favoriteCoffeeStoreById = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: `Coffee store with ${id} doesn't exist` });
      }
    } else {
      res.json({ message: `${id} doesn't exist` });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export default favoriteCoffeeStoreById;
