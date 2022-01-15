const express = require ("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));


const msg = "You can find all the blogs here: ";
const about = "This is the about page";
const conatct = "This is the contact page"

let posts=[]

app.get("/",function(req,res){
    res.render("home",{
        Msg:msg,
        posts:posts
    })
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

//Data Endpoint
// app.get("/data",(req,res)=>{
//     res.send(posts);
//     console.log(posts);
// })


app.get("/posts/:topic",(req,res)=>{
    const storedTitle = _.lowerCase(req.params.topic);
    posts.forEach(function(post){
        const title = _.lowerCase(post.Title);
        if(storedTitle===title){
            res.render("post",{
                PostHeading:post.Title,
                PostBody:post.Body
            });
        }
    })
})

app.listen(process.env.PORT||3000,function(){
    console.log("App runing at port 3000");
});