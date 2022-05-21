const http = require('http');
const router = require("./app/router.js")

const PORT = 3000

http
    .createServer((req, res) => router(req, res))
    .listen(PORT, () => console.log(`listening on port ${PORT}...`))