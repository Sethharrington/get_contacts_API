const router = require("express").Router();

router.use("/contacts", require("./contactsRouter"));

module.exports = router;
