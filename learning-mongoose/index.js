const mongoose = require('mongoose');
// Con local host no me ha funcionado
// mongoose.connect('mongodb://localhost:27017/test');

mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb://127.0.0.1:27017/test-db')
  .then(() => {
    console.log('Conectado a la base de datos test-db!');
  })
  .catch((err) => {
    console.log('Error conectado a la db:', err);
  });
