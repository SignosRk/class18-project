/* eslint-disable no-console */
// const axios = require('axios');

const app = require('./app');

const PORT = 8080;

// const { validateHouse } = require('./validation');

// axios.get('http://pastebin.com/raw/1Rs7eMwE').then(res => {
//     console.log(res.data.map(validateHouse));
// });

app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
);
