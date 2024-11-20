const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/submit", (req, res) => {
  const data = req.body;

  console.log(data);
  res.render("confirmation", { details: data });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
