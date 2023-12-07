require('./db');
const { Dog, Owner } = require('./models');
const seed = require('./seed');

const main = async () => {
  // Añadimos datos a la BBDD
  console.log('>>> Guardando los documentos');
  const dogs = await Dog.insertMany(seed.dogs);
  const owners = await Owner.insertMany(seed.owners);
  console.log('>>> Documentos guardados');

  console.log('>>> Actualizando los dogs con su owner');
  await Promise.all(
    dogs.map(async (dog) => {
      const owner = owners.find((owner) => owner._ownerId === dog._owner);
      await dog.updateOne({ owner: owner._id });
    })
  );
  console.log('>>> Elementos dogs actualizados');

  console.log('>>> Actualizando los owners con su dog');
  await Promise.all(
    owners.map(async (owner) => {
      const dbdogs = owner._dogs.map((dogId) => {
        const relatedDog = dogs.find((dog) => dog._petId === dogId);
        return relatedDog._id;
      });
      await owner.updateOne({ dogs: dbdogs });
    })
  );
  console.log('>>> Elementos owners actualizados');
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
