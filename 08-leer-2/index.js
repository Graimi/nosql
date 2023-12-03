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
    // Buscador general
    // Con el lean lo transformamos a json, es lo mismo y pesa menos
    const dogs = await Dog.find().lean();
    console.log('Lista de perros', dogs);

    // Buscador de perros tipo Poodle
    // Con el lean lo transformamos a json, es lo mismo y pesa menos
    const singleDog = await Dog.find({ type: 'Poodle' }).lean();
    console.log('Poodles encontrados', singleDog);

    // Buscador de perros con e en el tipo
    // Con el lean lo transformamos a json, es lo mismo y pesa menos
    // Con el método regex buscamos ocurrencias como las indicadas, con la i final hace referencia a mayúscula y minúsculas
    const dogsTypeWithE = await Dog.find({ type: { $regex: /e/i } }).lean();
    console.log('Tipos de perro que tengan e', dogsTypeWithE);

    // Buscador de perros con edad menor a 5
    // Con el lean lo transformamos a json, es lo mismo y pesa menos
    // Con el método lt (less than) buscamos números menores a 5
    const dogsAgeUnder5 = await Dog.find({ age: { $lt: 5 } }).lean();
    console.log('Perros con menos de 5 años', dogsAgeUnder5);

    // Buscador del primer perro que aparezca con edad mayor a 2
    // Con el lean lo transformamos a json, es lo mismo y pesa menos
    // Con el sort invertimos el orden de búsqueda
    // Con el método gt (greater than) buscamos números mayores a 2
    const dogWithMoreThanTwoYears = await Dog.findOne({ age: { $gt: 2 } })
      .sort({ age: -1 })
      .lean();
    console.log('Primer perro con más de 2 años', dogWithMoreThanTwoYears);

    // Buscador el elemento con el id correspondiente
    // Con el lean lo transformamos a json, es lo mismo y pesa menos
    const dogById = await Dog.findById('656cb2a3a4b6f59f521d652b').lean();
    console.log('Perro con el id dado', dogById);
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main();
