const fs = require("fs").promises;
const path = require("path");

// console.log(path);

/*
 * Раскомментируй и запиши значение
 */

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

// TODO: задокументировать каждую функцию
const listContacts = async (filePath) => {
  try {
    const data = await fs.readFile(filePath).then((data) => JSON.parse(data));
    // console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

// console.log(listContacts(contactsPath));

const getContactById = async (contactId, filePath) => {
  try {
    const data = await listContacts(filePath);
    // console.log(data);
    const find = data.find((item) => item.id === contactId);
    console.log(find);
    return find;
  } catch (err) {
    throw err;
  }
};

console.log(getContactById("3", contactsPath));

const removeContact = (contactId, filePath) => {};

const addContact = (name, email, phone) => {
  // ...твой код
};
