const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

//===============GET CONTACTS==============//

const listContacts = async (req, res, next) => {
  try {
    const data = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data));
    // console.log(req.params);
    // res.json({
    //   status: "success",
    //   code: 200,
    //   data: {
    //     result: data,
    //   },
    // });
    return data;
  } catch (err) {
    throw err;
  }
};
// listContacts();
const getContactById = async (req, res, next, contactId) => {
  console.log(contactId);
  try {
    // const { id } = req.params;
    const data = await listContacts();
    // console.log(data);
    const find = data.find((item) => item.id === contactId);
    // if (!find) {
    //   return res.status(404).json({
    //     status: "error",
    //     code: 404,
    //     message: "Not found",
    //   });
    // }
    // res.json({
    //   status: "success",
    //   code: 200,
    //   data: {
    //     find,
    //   },
    // });
    console.log(find);
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
