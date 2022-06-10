const logger = require('tracer').colorConsole()
const userController = require('./userController')

const userRouter = async (req, res) => {

    if (req.url == "/user/register") {

        console.log(req.body);
        let output = userController.register(data)

        if (output == true) {
            res.end("success")
        } else {
            res.end("failure")
        }

    }

}

module.exports = userRouter