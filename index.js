const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const fsWrite = (data) => fs.writeFile(contactsPath, JSON.stringify(data));

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

const addContact = async ({ name, email, phone }) => {
  try {
    const data = await listContacts();
    const newItem = {
      id: v4(),
      name,
      email,
      phone,
    };
    data.push(newItem);
    fsWrite(data);
  } catch (err) {
    throw err;
  }
};

const updateContact = async ({ contactId, name, email, phone }) => {
  const newData = { contactId, name, email, phone };
  try {
    const data = await listContacts();
    const index = data.findIndex(({ id }) => contactId === id);
    data[index].name = newData.name;
    data[index].email = newData.email;
    data[index].phone = newData.phone;
    fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newData = data.filter(({ id }) => id !== contactId);
    fsWrite(newData);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
