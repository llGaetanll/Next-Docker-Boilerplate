const express = require("express");

const app = express();
const port = 3000;

app.get("/api/test", (req, res) => {
  console.log("pinging server", process.env.DOMAIN);
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
