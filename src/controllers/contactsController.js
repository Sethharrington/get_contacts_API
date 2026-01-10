const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().collection("Contacts").find({});
  result
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    })
    .catch(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ error: "Failed to retrieve contacts" });
    });
};
const getById = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("Contacts")
    .find({ _id: contactId });
  result
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    })
    .catch(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ error: "Failed to retrieve contacts" });
    });
};

module.exports = {
  getAll,
  getById,
};
