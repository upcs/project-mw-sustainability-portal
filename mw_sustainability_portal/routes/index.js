const express = require("express");
const dotenv = require("dotenv").config();
var router = express.Router();

const app = express();

//Middleware
app.use(express.json());

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
