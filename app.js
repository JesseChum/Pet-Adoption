const express = require("express");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "3333",
  database: "pets",
});

async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log("Error connecting to datavase: " + err);
  }
}
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/adoptions", async (req, res) => {
  const conn = await connect();
  const results = await conn.query(
    "SELECT * FROM adoptions ORDER BY data_submitted DESC"
  );
  res.render("adoptions", { adoptions: results });
});

app.post("/submit", async (req, res) => {
  //Get the data from the form
  const data = req.body;

  //Connect to the database
  const conn = await connect();

  // Write to the database
  await conn.query(
    `INSERT INTO adoptions (pet_type, quantity, color) VALUES 
  ('${data.pet_type}', '${data.quantity}', '${data.color}')`
  );

  console.log(data);
  res.render("confirmation", { details: data });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
