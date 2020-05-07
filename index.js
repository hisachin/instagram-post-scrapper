import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
    globalErrorHandler,
    notFoundErrorHandler
}
from './app/utills';

const apiRoute = require('./app/routes');

const app = express();

const port = process.env.PORT || 3010;

let mongoURL = 'mongodb://localhost/scrapping'

mongoose.connect(mongoURL,{ useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify : false})
.then(data => {
    console.log('DB Coneccted..');
    
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');
    // app.set('views',__dirname+'/backend/views');
    // app.use(express.static(__dirname + '/dist/jobsman'));

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

    app.use('/api', apiRoute);

    //manage global not found error handling
    app.use(notFoundErrorHandler);

    //manage global error handling
    app.use(globalErrorHandler);

    const server = http.createServer(app);

    server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
}).catch(error => {
    console.log(error);
});