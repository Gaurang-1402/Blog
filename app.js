//jshint esversion:6

// To write a new blog post go to http://localhost:3000/compose

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
let dash = require("lodash")

mongoose.connect("mongodb+srv://admin-gaurang:test123@cluster0.w6ha0.mongodb.net/blogDB", {useNewUrlParser: true});

// let posts = []

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema)

//Need to add home content in database
app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {

    res.render("home", {
      startingContent: homeStartingContent,
      addedContent: posts
    });
  });

});




app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  })
})

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  })
})




app.get("/compose", function(req, res) {
  res.render("compose")
})

app.post("/compose", function(req, res) {
  let postBarContent = req.body.postBar;
  let titleBarContent = req.body.titleBar

  const newPost = new Post({
    title: titleBarContent,
    content: postBarContent
  })

  newPost.save(function(err) {
    if (!err) {
      res.redirect("/")
    }
  })
})

app.get("/posts/:day", function(req, res) {

  let postID = req.params.day


  Post.find({}, function(err, posts) {

    console.log(posts);
    posts.forEach(function(post) {
      if (post._id == postID) {
        console.log("Match found!");
        let wantedContent = post.content
        let wantedTitle = post.title
        res.render("post", {
          expandedPostTitle: wantedTitle,
          expandedPostContent: wantedContent
        })
      } else {
        console.log("No match found!");
      }

    })

  });

  // posts.forEach(function(post) {
  //   if (dash.lowerCase(post.titleContent) === postName) {


  // })

})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {
  console.log("Server started on port 3000");
});
