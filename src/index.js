// ./src/index.js

// importing the dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import imageRouter from './routers/images.js';
import userRouter from './routers/users.js';
import userPreviewRouter from './routers/userPreview.js';

const CURRENT_VERSION = 'v1';
const API_URL = `/api/${CURRENT_VERSION}`;

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoin

app.use(`${API_URL}/images`, imageRouter);
app.use(`${API_URL}/users`, userRouter);
app.use(`${API_URL}/discoverUsers`, userPreviewRouter);

console.log(Date.now());

// starting the server
app.listen(3080, () => {
  console.log('listening on port 3080');
});


//Estructura, capaz poner las llamadas de la DB y el storage en servicios.
//Ver lo de usar async await
//Ver lo de achicar el tema de la consulta
//Lo del quury paramter separar por palabras.
//