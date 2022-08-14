// Controller functions are imported
const controller = require("../controllers/sales.controller");

// Routes are mapped to corresponding controller function.
module.exports = function(app) {
  app.get(
    "/countries",
    controller.GetCountries
  );
  app.get(
    "/salesrep",
    controller.GetSalesRep
  );
  app.get(
    "/optimal",
    controller.GetOptimal
  );
}