'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


app.get('/', (request, response) => {
  response.send('');
});


app.get('*', (request, response) => {
  response.send('The thing you are looking for does not exist.');
});

