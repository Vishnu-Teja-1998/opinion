const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ejs = require("ejs")

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

app.get("/", function(req, res) {
  res.render('form')
})
app.post("/", function(req, res) {
  const person_name = req.body.personName;
  const person_opinion = req.body.personOpinion;

  const url = "mongodb+srv://admin-vishnu:vishnu123@vishnu-1nuon.mongodb.net/" + person_name + "DB"
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })


  const nameSchema = {
    name: String,
    opinion: String
  }

  const Name = mongoose.model("Opinion", nameSchema)

  const name1 = new Name({
    name: person_name,
    opinion: person_opinion
  })
  name1.save()

  app.get("/submit", function(req, res) {
    res.render('end')
  })
  res.redirect("/submit")


})

app.listen(3000, function() {
  console.log("Server Running on port: 3000");
})
