import express from 'express';
const connection = require('./conf');

const router = express.Router();


//1) Récupération de toute la table OK
router.get('/api/games', (req, res) => {
  connection.query('SELECT * FROM classement', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des jeux');
    } else {
      res.json(results);
    }
  });
});

//2) Récupération de quelques champs de la BDD OK
router.get('/api/filter-games', (req, res) => {


  connection.query('SELECT id, name, date from classement', (err, results) => {

    if (err) {
      res.status(500).send('Erreur lors de la récupération des jeux');
    } else {
      res.json(results);
    }
  });
});

//3) Un filtre "contient ..." (ex: nom contenant la chaîne de caractère 'wcs') OK
router.get('/api/filter-name/:name', (req, res) => {
  const name = req.params.name
  connection.query('SELECT * FROM classement WHERE name = ?',name, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération du jeu');
    } else {
      res.json(results);
    }
  });
});

//4) Un filtre "commence par ..." (ex: nom commençant par 'campus') OK
router.get('/api/filter-starts/:startswith', (req, res) => {

  const startswith = `${req.params.startswith}%`;

  connection.query('SELECT * FROM classement WHERE name LIKE ?', startswith, (err, results) => {

    if (err) {
      res.status(500).send('Erreur lors de la récupération de / des jeux');
    } else {
      res.json(results);
    }
  });
});


//5) Récupération des jeux qui ont une date > au 22/02/2015 OK
router.get('/api/filter-superieur', (req, res) => {

  const date = '2016-02-22'

  connection.query('SELECT * FROM classement WHERE date > ?', date, (err, results) => {

    if (err) {
      res.status(500).send('Erreur lors de la récupération de / des jeux');
    } else {
      res.json(results);
    }
  });
});


//6) Récupération de données ordonnées (ascendant, descendant) OK
router.get('/api/orderby/:order', (req, res) => {

  const order = req.params.order

  if(order === 'ASC') {
    connection.query('SELECT * FROM classement ORDER BY name ASC', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération et le trie des jeux');
      } else {
        res.json(results);
      }
    })
  } else if(order === 'DESC') {
    connection.query('SELECT * FROM classement ORDER BY name DESC', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération et le trie des jeux');
      } else {
        res.json(results);
      }
    })
  }
});

//7) Poster un jeu sur l'api OK
router.post('/api/postgames', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO classement SET ?', formData, (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un jeu");
    } else {
      res.sendStatus(200);
    }
  });
});

//8) Modification d'un jeu depuis son id OK
router.put('/api/editgames/:id', (req, res) => {

  const idGame = req.params.id;
  const data = req.body;

  connection.query('UPDATE classement SET ? WHERE id = ?', [data, idGame], err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un jeu");
    } else {

      res.sendStatus(200);
    }
  });
});

//9) Toggle du boolean en fonction de l'id d'un jeu OK
router.put('/api/boolean/:id', (req, res) => {
  const idUpdate = req.params.id;
  connection.query('UPDATE classement SET coup_de_coeur = !coup_de_coeur WHERE id = ?', idUpdate, err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification du boolean coup_de_coeur");
    } else {

      res.sendStatus(200);
    }
  });
})

//10) DELETE un jeu en fonction de l'id OK
router.delete('/api/deletegame/:id', (req, res) => {

  const idGame = req.params.id;

  connection.query('DELETE FROM classement WHERE id = ?', idGame, err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un employé");
    } else {

      res.sendStatus(200);
    }
  });
});

//11) DELETE un jeu si le boolean cou_de_coeur est false (= 0) OK
router.delete('/api/boolean-delete', (req, res) => {

  connection.query('DELETE FROM classement WHERE coup_de_coeur = 0', err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});




export default router;
