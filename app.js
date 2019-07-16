const express = require("express");
const data = require("./data.json").projects;
const path = require("path");
const app = express();
const port = 3000; 

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use('/static', express.static(path.join(__dirname, "public"))) //use express static to serve up static file in public
app.use('/images', express.static(path.join(__dirname, 'images'))) //serve up images as static files

app.get("/", (req, res) => {
    res.render("index", {
       data
    })
});

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/project/:id", (req, res) => {
    res.render('project', {
        data,
        data: data[req.params.id]
    })
})

app.use((err, req, res, next) => {
    console.log(err)
})

app.listen(port, () => {
    console.log(`App is running on ${port} !!!`)
})