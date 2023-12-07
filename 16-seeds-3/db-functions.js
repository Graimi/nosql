const { Dog, Owner } = require('./models');
const seed = require('./seed');

const cleanCollections = async () => {
  await Dog.collection.drop();
  await Owner.collection.drop();
  console.log('>>> Colecciones limpias');
};

const savedDocuments = async () => {
  const dogs = await Dog.insertMany(seed.dogs);
  const owners = await Owner.insertMany(seed.owners);
  console.log('>>> Documentos guardados');

  return {
    dogs,
    owners,
  };
};

const updateDogs = async (dogs, owners) => {
  await Promise.all(
    dogs.map(async (dog) => {
      const owner = owners.find((owner) => owner._ownerId === dog._owner);
      await dog.updateOne({ owner: owner._id });
    })
  );
  console.log('>>> Elementos dogs actualizados');
};

const updateOwners = async (dogs, owners) => {
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

const cleanPrivateFields = async () => {
  await Owner.updateMany(
    {},
    {
      $unset: {
        _ownerId: true,
        _dogs: true,
      },
    }
  );

  await Dog.updateMany(
    {},
    {
      $unset: {
        _petId: true,
        _owner: true,
      },
    }
  );
  console.log('>>> Campos privados eliminados');
};

module.exports = {
  cleanCollections,
  savedDocuments,
  updateDogs,
  updateOwners,
  cleanPrivateFields,
};
