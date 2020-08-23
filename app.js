const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes/routes');

const app = express();

mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.error(err);
            throw err;
        }

        console.log('Database is connect...');
    })

require('./config/express')(app);
app.use('/', indexRouter);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
