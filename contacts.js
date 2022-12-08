const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const listOfContacts = JSON.parse(data);
  return listOfContacts;
};

const getContactById = async (contactId) => {
  const listOfContacts = await listContacts();
  const result = listOfContacts.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const listOfContacts = await listContacts();
  const index = listOfContacts.find(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = listOfContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};