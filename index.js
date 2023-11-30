const express = require("express");
const app = express();

require('dotenv').config();


const API_KEY = process.env.API_KEY;

const apiKeyValidation = (req, res, next) => {
  const userApiKey = req.get("x-api-key");
  if (userApiKey && userApiKey === API_KEY) {
    next();
  }else {
    res.status(401).send('Invalid API key');
  }
  next();
};

app.use(express.json());
app.use(apiKeyValidation);	
const port = 3000;
const users = [
  { name: "Pepito", Lastname: "Perez"},
  { name: "Josefina", Lastname: "Vanegaz" },
  { name: "Mamerto", Lastname: "Campos" },
];

app.get("/users", (req, res) => {
  const requestedName = req.query.name;
  const filteredUsers = requestedName
    ? users.filter((user) => user.name === requestedName)
    : users;
  return res.send(filteredUsers);
});

app.get("/users/lastname/:lastname", (req, res) => {
  const requestedLastName = req.params.lastname;
  const filterLastName = users.find(
    (user) => user.Lastname === requestedLastName
    );
    return res.send(filterLastName);
  });
  
app.get("/users/id/:id", (req, res) => {
  const index = req.params.id;
  const user = users[index];
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.send(user);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.Lastname) {
    return res.status(400).send("Invalid user data");
  }
  users.push(newUser);
  return res.send("User created successfully");
});

app.put('/users/:id', (req, res) => {
  const index = req.params.id;
  users[index] = req.body;
  return res.send(users[index]);
});
app.delete('/users/:id', (req, res) => {
  const index = req.params.id;
  users.splice(index, 1);
  return res.send(users);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});