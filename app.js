const express = require("express");
const data = require("./data.json").projects;
const path = require("path");
const app = express();
const port = process.env.PORT || 5000; 

app.set("view engine", "pug"); //use pug
app.set("views", path.join(__dirname, "views")); //hook the pug up with express

app.use('/static', express.static(path.join(__dirname, "public"))) //use express static to serve up static file in public
app.use('/images', express.static(path.join(__dirname, 'images'))) //serve up images as static files

app.get("/", (req, res) => { //render index page and pass data to pug template
    res.render("index", {
       data 
    })
});

app.get("/about", (req, res) => {
    res.render("about") //render about page with pug
})

app.get("/project/:id", (req, res, next) => {
    //render project page with pug and use dynamic query id
    res.render('project', {
        data,
        data: data[req.params.id]
    })
})


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404 ; //handle 404 
    next(err);
})

app.use((err, req, res, next) => {
    const status = err.status || 500; //the default error handler when 404 no presented
    res.status(status); 
    res.render('error', {error: err}); //render error in error template
})


app.listen(port, () => {
    console.log(`App is running on ${port} !!!`)
})