const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes/route.js");

// Setup Middleware
app.use(express.json());

app.use("/users", route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

