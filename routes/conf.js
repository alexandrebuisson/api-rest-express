const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'petit malin... perdu mon mot de passe ne se trouve pas ici', // le mot de passe
database :  'comparatif_games', // le nom de la base de données
});
module.exports = connection;
