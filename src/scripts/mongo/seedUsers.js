//DEBUG=app:* && node src/scripts/mongo/seedUsers.js

const bcrypt = require('bcrypt');
const debug = require('debug');
const MongoLib = require('../../lib/mongo');
const { config } = require('../../config/index');

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true
  },
  {
    email: 'andres@undefined.sh',
    name: 'Andres',
    password: config.defaultUserPassword
  },
  {
    email: 'valencia@undefined.sh',
    name: 'Valenica',
    password: config.defaultUserPassword
  },
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin)
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async user => {
      const userId = await createUser(mongoDB, user);
      debug('User created with id:', userId);
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch(error) {
    debug(error);
    process.exit(1);
  }
}

seedUsers();