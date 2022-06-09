const http = require('http');
const fileServer = require("./app/fileServer")
const userRouter = require("./app/userRouter")
const databaseRouter = require("./app/databaseRouter")
const sessionRouter = require("./app/sessionRouter")

const PORT = 3000

http.createServer(async (req, res) => {

    //user router
    if (req.url.includes("/user")) {
        await userRouter(req, res)
    }

    //database router
    else if (req.url.includes("/database")) {
        await databaseRouter(req, res)
    }

    //session router
    else if (req.url.includes("/session")) {
        await sessionRouter(req, res)
    }

    //serve requested files
    else {
        fileServer(req, res)
    }
})
    .listen(PORT, () => console.log(`listening on port ${PORT}...`))