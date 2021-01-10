const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.get("/api", (req, res) => {
  res.json({ message: "API GET Request" });
});

app.post("/api", setToken, (req, res) => {
  jwt.verify(req.token, "ilovejsonwebtoken", (err, AuthData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "API POST Request", AuthData });
    }
  });
});

function setToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerHead = bearerHeader.split(" ")[1];
    req.token = bearerHead;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/api/login", (req, res) => {
  const user = {
    id: 6,
    name: "osaretin",
    email: "oboh@gmail.com",
  };

  jwt.sign(
    { user: user },
    "ilovejsonwebtoken",
    { expiresIn: "20s" },
    (err, token) => {
      res.json({ token: token });
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
