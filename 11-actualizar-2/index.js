const mongoose = require('mongoose');

mongoose.set('strict', false);
mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);

mongoose
  .connect('mongodb://127.0.0.1:27017/test-db')
  .then(() => {
    console.log('Conectado a la base de datos test-db!');
  })
  .catch((err) => {
    console.log('Error conectado a la db:', err);
  });

const emptySchema = new mongoose.Schema({});
const Dog = mongoose.model('Dog', emptySchema);

// Business logic
const main = async () => {
  try {
    // Actualiza y pisa la info de la primera ocurrencia que encuentre, pero por consola solo nos da resumen de cambios
    const updateDog = await Dog.updateOne(
      { _id: '65703b9ae18ca4ba972320a8' },
      { age: 6 }
    );
    console.log(updateDog);
    // Actualiza y pisa la info de la primera ocurrencia que encuentre, dando por consola la info de los cambios
    const updateDogWithInfo = await Dog.findByIdAndUpdate(
      '65703b9ae18ca4ba972320a8',
      { likes: ['playing'] },
      { new: true }
    ).lean();
    console.log(updateDogWithInfo);
    // Actualiza sin pisar la info de la primera ocurrencia que encuentre, dando por consola la info de los cambios
    // Atento a que aquí no envolvemos los nuevos con [], por lo que solo podemos añadir uno
    const updateDogWithInfoWithoutOverride = await Dog.findByIdAndUpdate(
      '65703b9ae18ca4ba972320a8',
      { $push: { likes: 'eating' } },
      { new: true }
    ).lean();
    console.log(updateDogWithInfoWithoutOverride);
    // Actualiza sin pisar la info de la primera ocurrencia que encuentre, dando por consola la info de los cambios
    // Con esta versión podemos añadir varios elementos y además con el $addToSet no repetimos
    const updateDogWithMultipleInfoWithoutOverride =
      await Dog.findByIdAndUpdate(
        '65703b9ae18ca4ba972320a8',
        { $addToSet: { likes: { $each: ['running', 'eating'] } } },
        { new: true }
      ).lean();
    console.log(updateDogWithMultipleInfoWithoutOverride);
    // Con $pull borramos la primera ocurrencia
    // Con $pullAll borramos todos los elementos que coincidan con lo indicado

    // Actualiza pisando la info de la primera ocurrencia que encuentre, dando por consola la info de los cambios
    // En este caso para objetos
    const updateDogObject = await Dog.findByIdAndUpdate(
      '65703b9ae18ca4ba972320a8',
      { $set: { owner: { name: 'Jaime' } } },
      { new: true }
    ).lean();
    console.log(updateDogObject);
    // Actualiza sin pisar la info de la primera ocurrencia que encuentre, dando por consola la info de los cambios
    // En este caso para objetos
    const updateDogObjectWithoutOverride = await Dog.findByIdAndUpdate(
      '65703b9ae18ca4ba972320a8',
      { $set: { 'owner.surname': 'Flores' } },
      { new: true }
    ).lean();
    console.log(updateDogObjectWithoutOverride);
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main();
