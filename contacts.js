const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

// TODO: задокументировать каждую функцию

//===============GET CONTACTS==============//

const listContacts = async () => {
  try {
    const data = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data));
    // console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

// listContacts();

const getContactById = async (contactId) => {
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

// getContactById("3");

//===============ADD AND REMOVE CONTACTS==============//

const addContact = async (id, name, email, phone) => {
  try {
    const data = await listContacts();
    const newItem = {
      id: id,
      name: name,
      email: email,
      phone: phone,
    };
    data.push(newItem);
    fs.writeFile(contactsPath, JSON.stringify(data));
    // console.log(data);
  } catch (err) {
    throw err;
  }
};

// addContact("4", "Shang Csung", "shang@mail.com", "0555555555");
// addContact("5", "Kung Lao", "lao@mail.com", "06666666666");

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newData = data.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newData));
    // console.log(data);
  } catch (err) {
    throw err;
  }
};

// removeContact("4");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
