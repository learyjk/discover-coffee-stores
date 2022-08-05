import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const record = await findRecordByFilter(id);

      if (record.length !== 0) {
        res.json(record);
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
