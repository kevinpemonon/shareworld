require('dotenv').config();

const express = require('express');
const router = require('./routes/routes');
const cors = require('cors');
// const morgan = require('morgan');

/* Call DB */
require('./database');

const app = express();

app.use(express.json());

// app.use(morgan('dev'));

app.use(cors());

app.use(router);

// DOCUMENTATION API
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server run on ${PORT}`));