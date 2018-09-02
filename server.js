var express = require('express');
var app = express();
app.use(express.static("test_project")); // myApp will be the same folder name.
app.get('/', function (req, res,next) {
 res.redirect('/'); 
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
console.log("MyProject Server is Listening on port 8080");