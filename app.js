const express = require ("express");
const bodyParser = require("body-parser");

const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));


const msg = "lorem ipsum solo fitto";
const about = "This is thje about page";
const conatct = "This is the contact page"

let posts=[]

app.get("/",function(req,res){
    res.render("home",{
        Msg:msg,
        posts:posts
    })
    // console.log(posts);
})

app.get("/contact",(req,res)=>{
    res.render("contact",{Contact:conatct});
})

app.get("/about",(req,res)=>{
    res.render("about",{About:about});
})

app.get("/compose",(req,res)=>{
    res.render("compose");
})

app.post("/compose",(req,res)=>{
    let post={
        Title : req.body.PostTitle,
        Body : req.body.PostBody
    };
    
    posts.push(post);
    res.redirect("/");
})

app.get("/data",(req,res)=>{
    res.send(posts);
    console.log(posts);
})

app.listen(3000,function(){
    console.log("App runing at  port 3000");
});