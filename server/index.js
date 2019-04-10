/* eslint-disable no-console */
const app = require('./app');

const PORT = 8080;

app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
);
