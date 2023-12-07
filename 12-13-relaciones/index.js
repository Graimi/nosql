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
const Owner = mongoose.model('Owner', emptySchema);

// Business logic
const main = async () => {
  try {
    // // Creamos el modelo y le asignamos datos
    // const newOwner = new Owner({
    //   name: 'Jaime',
    //   surname: 'Flores Luján',
    // });
    // await newOwner.save();

    // // Actualizamos la info del dueño y lo vinculamos con un objeto
    // await Dog.updateOne(
    //   { _id: '65703b9ae18ca4ba972320a8' },
    //   { owner: '657195ff8dc854026f0e1edc' }
    // );
    // await Dog.updateOne(
    //   { _id: '65703b9ae18ca4ba972320a6' },
    //   { owner: '657195ff8dc854026f0e1edc' }
    // );

    // // Actualizamos la info del dueño con la de sus perros
    // await Owner.updateOne(
    //   { _id: '657195ff8dc854026f0e1edc' },
    //   { dogs: ['65703b9ae18ca4ba972320a8', '65703b9ae18ca4ba972320a6'] }
    // );

    // Buscamos un dueño, con populate indicamos que información queremos
    // y de donde sacarla y le añadimos lean para visualizarlo bien
    // Ejemplo de relación 1:N
    const owner = await Owner.findOne({ name: 'Jaime' })
      .populate({
        path: 'dogs',
        model: 'Dog',
        select: { _id: true, name: true, type: true },
      })
      .lean();
    console.log(owner);

    // Buscamos todos los perros, con populate indicamos que información queremos aunque no todos lo tengan
    // y de donde sacarla y le añadimos lean para visualizarlo bien
    // Ejemplo de relación 1:1
    const dogs = await Dog.find()
      .populate({
        path: 'owner',
        model: 'Owner',
        select: { _id: true, name: true, surname: true },
      })
      .lean();
    console.log(dogs);
  } catch (error) {
    console.log('Error en la subido', error);
  }
};

main();
