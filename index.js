require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoute = require("./routes/product.route");

/* variables */
const port = process.env.PORT || 4000;

/* create app */
const app = express();

/* middlewares */
app.use(express.json());
app.use(cors({ credentials: true }));

/* bypass api */
app.use("/api/products", productRoute);
/* connect to database */
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`our app is runnign on port : ${port} and database connected`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
