const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const bodyparser=require('body-parser')
const { text } = require('body-parser')

const app=express()

mongoose.connect("mongodb://127.0.0.1:27017/customer", {
useNewUrlParser: true,
useUnifiedTopology: true
});

const contactSchema = {
    email: String,
    password: String,
    };
 const Contact = mongoose.model("numbers", contactSchema);

 app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render("input");
});

app.post("/contact", function (req, res) {
	console.log(req.body.email);
const contact = new Contact({
	email: req.body.email,
	password: req.body.password,
});
contact.save(function (err) {
	if (err) {
		throw err;
	} else {
		res.render("");
	}
});
});

app.listen(3000, function(){
	console.log("App is running on Port 3000");
});

