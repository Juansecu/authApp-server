const express = require('express');

const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/api', routes);

app.listen(app.get('port'), () =>
    console.log(`Server started on port ${app.get('port')}!`)
);
