const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("../public/javascripts/src/config/dbConnect");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
var router = express.Router();


dbConnect();

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", authRoutes);


//Start the server
const PORT2 = process.env.PORT2 || 7001;
app.listen(PORT2, () => {
    console.log(`Server is running at port ${PORT2}`);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
