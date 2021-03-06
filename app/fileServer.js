const fs = require("fs")
const logger = require("tracer").colorConsole()

const fileServer = (req, res) => {


    //load files requested by application

    if (req.method == "GET") {

        var url = req.url == "/" ? "/index.html" : req.url
        url == "/game" ? url = "/mainGame.html" : null
        var extension = url.split(".")[url.split(".").length - 1]
        var contentType
        extension == "html" ? contentType = 'text/html' : null
        extension == "css" ? contentType = 'text/css' : null
        extension == "js" ? contentType = 'application/javascript' : null
        extension == "ico" ? contentType = 'image/x-icon' : null
        extension == "ttf" ? contentType = 'application/octet-stream' : null
        extension == "jpg" ? contentType = 'image/jpeg' : null
        extension == "svg" ? contentType = 'image/svg+xml' : null
        extension == "mp3" ? contentType = 'audio/mpeg' : null
        extension == "png" ? contentType = 'image/png' : null
        extension == "otf" ? contentType = 'font/otf' : null
        extension == "gif" ? contentType = 'image/gif' : null
        extension == "mp4" ? contentType = 'video/mp4' : null

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

module.exports = fileServer