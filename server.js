
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");

 // this will use in encrypation
const saltRounds = 10; 

 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

 
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    
    const hash = bcrypt.hashSync(password, saltRounds); // help in encryption PSWD
    
    res.redirect(`/user?username=${username}&password=${hash}`); // redirect
  } else {
    res.redirect("/");
  }
});

 
app.get("/user", (req, res) => {
  const { username, password } = req.query;
  

  res.send(`Welcome " ${username}! " Your encrypted password is this: " ${password} "`);
});

 
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

