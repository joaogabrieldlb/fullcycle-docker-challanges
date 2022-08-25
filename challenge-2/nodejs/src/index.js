const express = require('express');
const faker = require('faker');
const mysql = require('mysql');

const app = express();
const port = process.env.APP_PORT || 3333;

const connection = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'nodedb',
});

app.get('/', (request, response) => {
  const newName = faker.name.findName();

  connection.query(`INSERT INTO people (name) VALUES ('${newName}')`,
  function(err, result) {
    if (err) throw err;
  });

  connection.query(`SELECT name FROM people`, function (err, results, fields) {
    if (err) throw err;
    return response.send(`
      <h1>Full Cycle Rocks!</h1>
      <p>Lista de nomes cadastrados no banco de dados:</p>
      <ol>
        ${results.map(people => `<li>${people.name}</li>`).join('')}
      </ol>
    `);
  });
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})