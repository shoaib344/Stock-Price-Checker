document.getElementById('testForm2').addEventListener('submit', e => {
    e.preventDefault();
    const stock = e.target[0].value;
    const checkbox = e.target[1].checked;
    fetch(`/api/stock-prices/?stock=${stock}&like=${checkbox}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('jsonResult').innerText = JSON.stringify(data);
      });
  });
  
  document.getElementById('testForm').addEventListener('submit', e => {
    e.preventDefault();
    const stock1 = e.target[0].value;
    const stock2 = e.target[1].value;
    const checkbox = e.target[2].checked;
    console.log(stock1, stock2, checkbox);
    fetch(`/api/stock-prices?stock=${stock1}&stock=${stock2}&like=${checkbox}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('jsonResult').innerText = JSON.stringify(data);
      });
  });

app.get('/api/stock-prices', (req, res) => {
  // Your logic here
});


const helmet = require('helmet');
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);


app.get('/api/stock-prices', async (req, res) => {
  const stock = req.query.stock;
  if (!stock) {
    return res.status(400).json({ error: 'Stock symbol is required' });
  }
  // Fetch stock data logic here
  const stockData = {
    stock: stock.toUpperCase(),
    price: 123.45, // Example price
    likes: 10,     // Example likes
  };
  res.json({ stockData });
});




const stockData = {
  stock: 'AAPL', // string
  price: 123.45, // number
  likes: 10,     // number
};
res.json({ stockData });



app.get('/api/stock-prices', async (req, res) => {
  const { stock } = req.query;
  if (!stock) {
    return res.status(400).json({ error: 'Stock symbol(s) are required' });
  }

  const stocks = Array.isArray(stock) ? stock : [stock]; // Handle single or multiple stocks
  const stockDataArray = await Promise.all(
    stocks.map(async (s) => {
      const price = 123.45; // Fetch price
      const likes = 10;     // Fetch likes
      return { stock: s.toUpperCase(), price, likes };
    })
  );

  if (stockDataArray.length === 2) {
    const relLikes = stockDataArray[0].likes - stockDataArray[1].likes;
    stockDataArray[0].rel_likes = relLikes;
    stockDataArray[1].rel_likes = -relLikes;
    delete stockDataArray[0].likes;
    delete stockDataArray[1].likes;
  }

  res.json({ stockData: stockDataArray });
});
