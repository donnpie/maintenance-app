//maintenance-app server.js

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

//routers
const item = require('./routes/items');
const update = require('./routes/update');

const app = express();
const port = process.env.PORT || 5000;

//Connect to remote MongoDb
const db = require('./config/keys').mongoUri;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to remote MongoDB..."))
    .catch(err => console.log(err));

//Cross origin permission
app.use(cors({
    origin: ['*','http://localhost:3000', process.env.PORT]
}));

//Middleware
app.use(helmet());
app.use(express.json());

//Use routes
app.use('/api/items', item);
app.use('/api/update', update);

app.listen(port, () => console.log(`Server now listening on port ${port}...`));