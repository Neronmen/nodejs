const systemConfig = require("../../config/system")
const dashboard = require("./dashboard.route");
const product = require("./product.route");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use( PATH_ADMIN + "/dashboard", dashboard);
  app.use( PATH_ADMIN + "/product", product);

};
