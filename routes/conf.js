const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  '?1LAsdgrecrute', // le mot de passe
database :  'comparatif_games', // le nom de la base de données
});
module.exports = connection;