import express from 'express';
import bodyParser from 'body-parser';
import expressEjsLayouts from 'express-ejs-layouts';

const port = 3000;

const app = express();
let blogs = [];

app.use(expressEjsLayouts);
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("pages/index.ejs")
})

app.get("/blogs", (req, res) => {
  res.render("pages/blogs.ejs", {
    blogs: blogs
  })
})

app.get("/create", (req, res) => {
  res.render("pages/create.ejs")
})

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  blogs = blogs.filter((blog) => blog.id !== id);
  res.redirect("/blogs");
})

app.get("/blogs/blog/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === id);
  res.render("pages/blog.ejs", { blog })
})

app.post("/create", (req, res) => {
  const id = new Date().toISOString();
  const title = req.body["title"];
  const content = req.body["content"];
  blogs.push({ id, title, content })
  res.redirect("/blogs");
})


app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})