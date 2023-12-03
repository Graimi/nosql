const mongoose = require('mongoose');
// Con local host no me ha funcionado
// mongoose.connect('mongodb://localhost:27017/test');

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
    const newDog = new Dog({
      name: 'Tambor',
      type: 'Pug',
    });
    await newDog.save();
    console.log('El elemento se ha guardado correctamente');
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main();
