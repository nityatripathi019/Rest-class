
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methoOverride = require("method-override");


//middleware
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(methoOverride("_method"));
let posts = [
    {
        id: uuidv4(),
        username:"Virat Kohli",
        content:"Perth me toota australia ka ghamand"
    },
    {    id:uuidv4(),
        username:"Shreya Tripathi",
        content:"Hello ,I am shreya tripathi and i am optometrist"
    },
    {
        id:uuidv4(),
        username:"Nitya Tripathi",
        content:"Hurray,I have got my first job ..finally this happend"
    }
]
//index Route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
//create new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let newId = uuidv4(); 
    posts.push({username:username,content:content,id:newId});
    res.redirect("/posts");
})

//show Route
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    console.log(id);
   let post = posts.find((p)=>id===p.id);
   console.log(post);
  
   res.render("show.ejs",{post});
})
//Update route
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let {content}= req.body;
    console.log(content);
    console.log(req.body);
     let post = posts.find((p)=>id===p.id);
    post.content=content;
    console.log(post);
res.redirect("/posts");
    
})


//edit route
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})


//DELETE ROUTE
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    console.log(id);
     posts = posts.filter((p)=>id!==p.id);
     console.log(posts);
   res.redirect("/posts");
})

app.get("/",(req,res)=>{
    res.send("Hi,this is root page");
})

app.listen(port,(req,res)=>{
    console.log(`listening on port ${port}`);
})