const fs = require("fs")
const logger = require("tracer").colorConsole()
const userController = require("./usersController")

const router = (req, res) => {

    //handle server methods

    if (req.method == "POST" && req.url == '/join') {

        console.log(req.body);

        let data = JSON.parse(req.body)

        if (data.id == null) {
            data.id = userController.findGame()
        }


        if (userController.joinGame(data)) {
            res.end(JSON.stringify(userController.getInformation(data.id)))
        }
        else {
            res.end(false)
        }


    }


    //load files requested by application

    else if (req.method == "GET") {

        var url = req.url == "/" ? "/index.html" : req.url
        var extention = url.split(".")[url.split(".").length - 1]
        var contentType
        extention == "html" ? contentType = 'text/html' : null
        extention == "css" ? contentType = 'text/css' : null
        extention == "js" ? contentType = 'application/javascript' : null
        extention == "ico" ? contentType = 'image/x-icon' : null
        extention == "ttf" ? contentType = 'application/octet-stream' : null
        extention == "jpg" ? contentType = 'image/jpeg' : null

        // logger.log("requested url: ", url)

        fs.readFile("./app/views" + url, (error, data) => {

            if (error) {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(`<h1 style="text-align:center;margin:5vh">404 - page not found</h1>`)
                res.end()
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType })
                res.write(data)
                res.end()
            }
        })

    }



}

module.exports = router