const express = require("express");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const app = express();

//Body parser middeware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect Database
connectDB();

//Use routes
app.use("/api/users", users);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
