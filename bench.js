// bench.js
const autocannon = require('autocannon');

const config = {
  url: 'http://localhost:3000/api/users',
  connections: 10,     // conexões concorrentes
  amount: 500,         // total de requests
};

autocannon(config, (err, result) => {
  if (err) {
    console.error('Erro no benchmark:', err);
    process.exit(1);
  }
  console.log('Resultado do benchmark:\n', result);
});
