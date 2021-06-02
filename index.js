const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// const path = require("path");
// const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

// const contactsList = listContacts(contactsPath);
// TODO: рефакторить
const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      listContacts().then((data) => console.log(data));
      break;
    case "get":
      getContactById(id).then((contact) => console.log(contact));
      //   console.log("id", id);
      break;
    case "add":
      addContact(id, name, email, phone);
      //   console.log("name email phone", name, email, phone);
      break;
    case "remove":
      removeContact(id);
      //   console.log("id", id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type");
  }
};
invokeAction(argv);
