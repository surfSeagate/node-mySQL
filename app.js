const express = require("express");
const mysql = require("mysql");

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "nodemysql"
});

// connect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected..");
});

const app = express();
// create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created by Glenn");
  });
});
// create table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int auto_increment, title varchar(255), body varchar(255), Primary key (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("posts table created");
  });
});

// Insert post1
app.get("/addpost1", (req, res) => {
  let post = { title: "Post One", body: "This is post number 1" };
  let sql = "Insert into posts set ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post 1 added");
  });
});
// Insert post2
app.get("/addpost2", (req, res) => {
  let post = { title: "Post two", body: "This is post number 2" };
  let sql = "Insert into posts set ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post 2 added");
  });
});
// SELECT
app.get("/getposts", (req, res) => {
  let sql = "select * from posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("posts fetched");
  });
});

// SELECT single post
app.get("/getpost/:id", (req, res) => {
  let sql = `select * from posts where id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post  fetched");
  });
});
// UPDATE posts
app.get("/updatepost/:id", (req, res) => {
  let newTitle = `updated title ${req.params.id}`;
  let sql = `update posts set title = '${newTitle}' where id = ${
    req.params.id
    }`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post  updated");
  });
});

// DELETE post
app.get("/deletepost/:id", (req, res) => {
  //let newTitle = `updated title ${req.params.id}`;
  let sql = `delete from posts where id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post  deleted");
  });
});

app.listen("3000", () => {
  console.log("server started on port 3306");
});
