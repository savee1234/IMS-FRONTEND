const express = require("express");
const { getContactByMobile, createContact } = require("../controllers/contactController");

const router = express.Router();

router.get("/:mobile", getContactByMobile);
router.post("/", createContact);

module.exports = router;
