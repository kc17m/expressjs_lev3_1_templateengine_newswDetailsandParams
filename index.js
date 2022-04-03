const express = require("express")

const { news } = require("./data.js")

const PORT = 9008
const app = express()

app.set("view engine", "ejs")

app.use((req, _, next) => {
    console.log("new request", req.method, req.url)
    next()
})

app.use(express.static("public"))


app.get("/", (req, res) => {
    console.log(news)
    res.render("index", { news })
})


app.get("/news/:title", (req, res) => {
    const articleItem = req.params.title
    const articleDetail = news.find(el => el.publishedAt === articleItem)
    console.log("found newsarticle with Date", articleItem, ":", articleDetail)
    res.render("articleDetails", { articleDetail })
})


app.use((_, res) => {
    res.status(404)
    res.sendFile(__dirname + "/public/error.html")
})

app.listen(PORT, () => console.log("Server listening on port:", PORT))