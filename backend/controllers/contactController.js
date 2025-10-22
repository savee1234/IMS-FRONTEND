const Contact = require("../models/Contact");

const getContactByMobile = async (req, res) => {
 try {
   const contact = await Contact.findOne({ mobile: req.params.mobile });
   if (contact) res.json(contact);
   else res.status(404).json({ message: "Contact not found" });
 } catch (error) {
   res.status(500).json({ message: "Error fetching contact", error });
 }
};

// Optional: Create new contact
const createContact = async (req, res) => {
 try {
   const contact = await Contact.create(req.body);
   res.status(201).json(contact);
 } catch (error) {
   res.status(500).json({ message: "Error creating contact", error });
 }
};

module.exports = { getContactByMobile, createContact };
