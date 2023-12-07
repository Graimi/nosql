require('./db');
const { cleanCollections, savedDocuments, updateDogs, updateOwners, cleanPrivateFields } = require('./db-functions');


const main = async () => {
  // Limpiamos la colección cada vez que lanzamos el script
  await cleanCollections()
  // Añadimos datos a la BBDD
  const { dogs, owners } = await savedDocuments();
  await updateDogs(dogs, owners);
  await updateOwners(dogs, owners);
  await cleanPrivateFields();
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
