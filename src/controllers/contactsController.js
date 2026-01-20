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

const createContact = async (req, res) => {
  console.log("Creating contact with data:", req.body);
  const newContact = req.body;
  const result = await mongodb
    .getDatabase()
    .collection("Contacts")
    .insertOne(newContact);
  if (result.acknowledged) {
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(result.insertedId);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed to create contact" });
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const updatedContact = req.body;
  const result = await mongodb
    .getDatabase()
    .collection("Contacts")
    .updateOne({ _id: contactId }, { $set: updatedContact });
  if (result.modifiedCount > 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact updated successfully" });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed to update contact" });
  }
};
const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("Contacts")
    .deleteOne({ _id: contactId });
  if (result.deletedCount > 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact deleted successfully" });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

module.exports = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact,
};
