import {
  findRecordByFilter,
  getMinifiedRecords,
  table,
} from "../../lib/airtable";

const favoriteCoffeeStoreById = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        const record = records[0];
        const calculateVoting = parseInt(record.voting) + 1;

        const updateRecord = await table.update([
          {
            id: record.recordId,
            fields: {
              voting: calculateVoting,
            },
          },
        ]);
        if (updateRecord) {
          console.log("one");
          const r = getMinifiedRecords(updateRecord);
          console.log("here");
          res.json(r);
        }
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
