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
    // Borra todos los que cumplan la condición
    const deletedMany = await Dog.deleteMany({
      age: { $gt: 4 },
    });
    // Borra el primer elemento
    const deletedFirst = await Dog.deleteOne({});
    // Borra el primero que cumpla la condición
    const deletedOne = await Dog.deleteOne({
      name: 'Bella',
    });
    // Borra el primero que cumpla la condición y además da la información de que se ha borrado
    const deletedOneInfo = await Dog.findByIdAndDelete('656cb2a3a4b6f59f521d652d').lean();
    console.log(deletedOne);
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main();
