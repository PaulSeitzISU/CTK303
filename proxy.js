const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://mybirthdayhits.com/us/1999-09-07/0/');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
