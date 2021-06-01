const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

// TODO: задокументировать каждую функцию

//===============GET CONTACTS==============//

const listContacts = async (filePath) => {
  try {
    const data = await fs.readFile(filePath).then((data) => JSON.parse(data));
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

console.log(listContacts(contactsPath));

const getContactById = async (contactId, filePath) => {
  try {
    const data = await listContacts(filePath);
    // console.log(data);
    const find = data.find((item) => item.id === contactId);
    // console.log(find);
    return find;
  } catch (err) {
    throw err;
  }
};

// console.log(getContactById("3", contactsPath));

//===============ADD AND REMOVE CONTACTS==============//

const addContact = async (id, name, email, phone, filePath) => {
  try {
    const data = await listContacts(filePath);
    const newItem = {
      id: id,
      name: name,
      email: email,
      phone: phone,
    };
    data.push(newItem);
    fs.writeFile(filePath, JSON.stringify(data));
    // console.log(data);
  } catch (err) {
    throw err;
  }
};

// console.log(
//     addContact("4", "Shang Csung", "shang@mail.com", "0555555555", contactsPath),
//   addContact("5", "Kung Lao", "lao@mail.com", "06666666666", contactsPath)
// );

const removeContact = async (contactId, filePath) => {
  try {
    const data = await listContacts(filePath);
    const newData = data.filter(({ id }) => id !== contactId);
    fs.writeFile(filePath, JSON.stringify(newData));
    // console.log(data);
  } catch (err) {
    throw err;
  }
};

// console.log(removeContact("5", contactsPath));

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
