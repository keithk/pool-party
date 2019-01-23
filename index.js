const express = require("express");

const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const cors = require("cors");

const uid = require("node-uid");

const app = express();

const multer = require("multer");

const jwt = require("express-jwt");

const jwksRsa = require("jwks-rsa");

require("dotenv").config();

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.

  secret: jwksRsa.expressJwtSecret({
    cache: true,

    rateLimit: true,

    jwksRequestsPerMinute: 5,

    jwksUri: `https://poolparty.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.

  audience: "https://pool.cute.is/api/",

  issuer: `https://poolparty.auth0.com/`,

  algorithms: ["RS256"]
});

// API Functions

const API = require("./lib/get-pools");

// Middleware

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies

    extended: false
  })
);

app.use(cors());

app.get("/api/pools", checkJwt, async (req, res) => {
  const uid = req.user.sub;

  // This gets all of the open pools

  const openPools = await API.getOpenPools();

  // And this gets all of the pools that you've joined

  const joinedPools = await API.getJoinedPools(uid);

  res.json({ joinedPools, openPools });
});

app.post("/api/pools", checkJwt, async (req, res) => {
  const uid = req.user.sub;

  await API.updateUserDetails(req.user); // so that we can get the user info before they make it to the pool page

  const password = req.body.password;

  // Join a pool if you have the right password

  const joinPool = await API.joinPool(uid, password);

  res.json(joinPool);
});

app.get("/api/pool/:id", checkJwt, async (req, res) => {
  const uid = req.user.sub;

  await API.updateUserDetails(req.user);

  const pool = await API.getPool(req.params.id, uid);

  res.json(pool);
});

app.post("/api/pool/:id", checkJwt, async (req, res) => {
  const uid = req.user.sub;

  await API.updateUserDetails(req.user);

  const pool = await API.updateChoices(req.params.id, req.body, uid);

  res.json(pool);
});

// Choosing a winner of a category

app.post("/api/pool/:pool/:choice", checkJwt, async (req, res) => {
  const uid = req.user.sub;

  const response = await API.chooseWinner(req.body, uid);

  res.json(response);
});

app.use("/", express.static("client/build"));

app.use("/pools", express.static("client/build"));

app.use("/pool/*", express.static("client/build"));

app.use("/callback", express.static("client/build"));

app.listen(3001, () => console.log("Server running on :3001 🚀!"));
