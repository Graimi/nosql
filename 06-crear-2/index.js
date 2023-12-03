const mongoose = require('mongoose');
const dogs = require('./dogs');

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
    const savedDogs = await Dog.insertMany(dogs);
    console.log(savedDogs);
    console.log('Los elementos se ha guardado correctamente');
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main();
