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
    const updateDog = await Dog.updateOne({_id: '65703b9ae18ca4ba972320a8'}, {age: 6})
    console.log(updateDog)
    // Actualiza y pisa la info de la primera ocurrencia que encuentre, dando por consola la info de los cambios
    const updateDogWithInfo = await Dog.findByIdAndUpdate(
      { _id: '65703b9ae18ca4ba972320a8' },
      { age: 9 },
      { new: true }
    ).lean();
    console.log(updateDogWithInfo);
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main();
