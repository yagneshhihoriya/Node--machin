const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product-routes');
const categoryRoutes = require('./routes/category-routes');
const cors = require('cors')

const port = process.env.PORT || 3000;
const www = process.env.WWW || './';

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
