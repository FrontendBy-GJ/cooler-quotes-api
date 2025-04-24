const quotes = require('./coolers-revenge-quotes.json');
const express = require('express');
const app = express();
const cors = require('cors');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function randomQuote(arr) {
  return Math.floor(Math.random() * arr.length);
}

app.get('/', (req, res) => {
  const randomIdx = randomQuote(quotes);

  res.render('index.ejs', {
    quote: quotes[randomIdx],
  });
});

app.get('/api/characters', (req, res) => {
  const characters = [...new Set(quotes.map((q) => q.character))];
  res.json(characters);
});

app.get('/api/quotes/random', (req, res) => {
  const randomIdx = randomQuote(quotes);
  res.json(quotes[randomIdx]);
});

app.get('/api/quotes/random/:character', (req, res) => {
  const from = req.params.character.toLowerCase();
  const quotesFrom = Object.entries(quotes).reduce((acc, [_, data]) => {
    if (data.character.toLowerCase() === from) {
      acc.push(data);
    }
    return acc;
  }, []);
  const randomIdx = randomQuote(quotesFrom);
  res.json(quotesFrom[randomIdx]);
});

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
