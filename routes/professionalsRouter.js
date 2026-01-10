const router = require("express").Router();
const professionalController = require("../controllers/professionalController");

router.get("/", professionalController.getProfessionals);

module.exports = router;
