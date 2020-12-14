
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const slotsRouter = require('./slotsRouter');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false }));
app.use( express.static(path.join(__dirname,'/views')) );

app.use('/api',slotsRouter);

app.listen(PORT, () => console.log('Server is starting on PORT, ', 8080));
