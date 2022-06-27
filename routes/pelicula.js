const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/pelicula');
const auth = require('../middlewares/auth');

router.get('/characters', auth, peliculaController.getCharacters);
router.get('/characters/:query', auth, peliculaController.findCharacter);

router.post('/character', auth, peliculaController.postCharacter);
router.delete('/character/:id', auth, peliculaController.deleteCharacter);

module.exports = router;
