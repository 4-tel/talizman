const logger = require('tracer').colorConsole()

const userRouter = async (req, res) => {

    if (req.url == "/user/register") {

        console.log(req.body);
        res.end("działa")

    }

}

module.exports = userRouter