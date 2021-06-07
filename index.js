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
  // console.log(contactId);
  try {
    const data = await listContacts();
    // console.log(data);
    const find = data.find((item) => item.id === contactId);
    // console.log(find);
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
    // console.log(newItem);
    data.push(newItem);
    fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (err) {
    throw err;
  }
};

const updateContact = async ({ contactId, name, email, phone }) => {
  // console.log(contactId);
  const newData = { name, email, phone };
  // console.log(newData);
  try {
    let data = await listContacts();
    const index = data.findIndex(({ id }) => contactId === id);
    console.log(data[index].name);
    data[index].name = "lulu";
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
  updateContact,
  removeContact,
};
