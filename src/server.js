const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>
    console.log(`Server started on port ${app.get('port')}!`)
);
