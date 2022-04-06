const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/9919?s=460&v=4",
        name: "Fulano",
        role: "Instrutor - Empresa",
        description: "Programador full-stack, focado em trazer o melhor ensino em programação.",
        links: [
            { name: "Github", url: "https://github.com/"},
            { name: "Twitter", url: "https://twitter.com/"},
            { name: "LinkedIn", url: "https://linkedin.com/"}
        ]
    }

    return res.render("about", { about })
})


server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})


server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})


server.listen(5000, function() {
    console.log("server is runing")
})