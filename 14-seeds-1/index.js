require('./db');
const { Dog, Owner } = require('./models');
const seed = require('./seed');

// Business logic
const main = async () => {
  try {
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main()
  .then(() => {
    console.log('Script terminado!');
    process.exit();
  })
  .catch((err) => {
    console.log('Error lanzando script!', err);
    process.exit(1);
  });
