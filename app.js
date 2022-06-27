const express = require('express');
const app = express();
const sequelize = require('./database/connection');
const errHandler = require('./middlewares/errHandler');
const path = require('path');
const multer = require('multer');
const { v4: uuid4 } = require('uuid');
const Usuario = require('./models/usuario');
const Personaje = require('./models/personaje');
const Pelicula = require('./models/pelicula');
const Genero = require('./models/genero');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/pelicula');
const cors = require('./middlewares/cors');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'data/images');
  },
  filename(req, file, cb) {
    cb(null, `${uuid4()}.${file.originalname.split('.')[1]}`);
  },
});

Pelicula.hasMany(Genero, { onDelete: 'CASCADE' });
Genero.belongsTo(Pelicula, { onDelete: 'CASCADE' });

Personaje.belongsToMany(Pelicula, { through: 'PeliculasPersonajes' });
Pelicula.belongsToMany(Personaje, { through: 'PeliculasPersonajes' });

app.use(express.json());
app.use(multer({ storage }).single('imagen'));
app.use('/images', express.static(path.join(__dirname, 'data/images')));
app.use(cors);
app.use('/auth', authRoutes);
app.use('/movie', movieRoutes);
app.use(errHandler);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(8080, () => console.log(`server started`));
  } catch (err) {
    console.log(err);
  }
})();
