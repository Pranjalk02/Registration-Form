var express=require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');

var app=express();
app.use('/images',express.static('images'));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))


app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.post("/submit-data",function(req,res){
    var name=req.body.name;
    var age=req.body.age;
    var email=req.body.email;
    var password=req.body.password;
    var cpassword=req.body.cpassword;
    
    var data={
        "name": name,
        "age": age,
        "email": email,
        "password": password,
        "cpassword":cpassword
    }
    db.collection('users').insertOne(data,(err,collection) =>{
        if(err)throw err;
        console.log("Record Inserted");
    })
    return res.redirect('succes.html');
})

app.listen(8001);
console.log("Server Started with port 8001");




