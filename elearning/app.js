require('dotenv').config()

const express = require('express');
const app = express();

const port = 3000 || process.env.port

const routers = require("./routes");

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(routers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})