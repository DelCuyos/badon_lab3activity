const express = require('express');
const { it } = require('node:test');
const app = express();
const port = 3000;

const items = ['Banana', 'StarApple', 'Starfruit'];

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}); 



app.post('/submit', (req, res) => {
    const data = req.body;
  res.send(`Received: ${JSON.stringify(data)}`);
})

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');   
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); 
});