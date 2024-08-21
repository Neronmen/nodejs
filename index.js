const express = require('express')
const app = express()
const port = 3000
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const systemConfig = require("./config/system")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('express-flash')
const cookieParser = require(`cookie-parser`)
const session = require(`express-session`)
const slug = require('mongoose-slug-updater');

const database = require("./config/database");
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))

//Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//[PATCH]
app.use(methodOverride('_method'))

database.connect();
// Cấu hình thằng pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// file tĩnh
app.use(express.static(`${__dirname}/public`))

app.locals.prefixAdmin = systemConfig.prefixAdmin;

route(app);
routeAdmin(app);

app.listen(port,() =>{
    console.log("Connect successfully")
})


