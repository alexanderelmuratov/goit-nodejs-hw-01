const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const contactsOperations = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactsOperations.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contactById = await contactsOperations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id="${id}" not found!`);
      }
      console.table(contactById);
      break;

    case 'add':
      const contactsAfterAdd = await contactsOperations.addContact(name, email, phone);
      console.table(contactsAfterAdd);
      break;

    case 'remove':
      const contactsAfterRemove = await contactsOperations.removeContact(id);
      console.table(contactsAfterRemove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);