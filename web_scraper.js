const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the date (YYYY-MM-DD): ', date => {
  rl.question('Enter the country code (us, uk, etc.): ', country => {
    rl.close();

    // URL of the website you want to scrape
    const url = `https://mybirthdayhits.com/${country}/${date}/0/`;

    // Send an HTTP GET request to the website
    axios.get(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        // Find and print text content from h2 and h3 elements
        const h2Elements = $('h2');
        const h3Elements = $('h3');

        console.log('=== h2 Elements ===');
        h2Elements.each((index, element) => {
          console.log($(element).text());
        });

        console.log('=== h3 Elements ===');
        h3Elements.each((index, element) => {
          console.log($(element).text());
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
});
