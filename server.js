// Port start
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);

// DB Connect
const db = require("./api/models");

db.mongoose
  .connect(`mongodb://localhost:27017/bezkoder_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Routes
const router = express.Router();
const routes = [
  require("./api/routes/auth")(router, {}),
  require("./api/routes/user")(router, {}),
];
app.use("/api", routes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SoNote." });
});

// Page Not Found
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
