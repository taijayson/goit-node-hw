const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

//===============GET CONTACTS==============//

const listContacts = async () => {
  try {
    const data = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data));
    return data;
  } catch (err) {
    throw err;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const find = data.find((item) => item.id === contactId);
    return find;
  } catch (err) {
    throw err;
  }
};

//===============ADD AND REMOVE CONTACTS==============//

const addContact = async (id, name, email, phone) => {
  try {
    const data = await listContacts();
    const newItem = {
      id: v4(),
      name: name,
      email: email,
      phone: phone,
    };
    data.push(newItem);
    fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newData = data.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newData));
  } catch (err) {
    throw err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
