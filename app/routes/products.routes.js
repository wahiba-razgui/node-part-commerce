const productsController = require("../controllers/products.controller");
var router = require("express").Router();

module.exports = app => {
    // Create a new Hotel
    router.post("/", productsController.create);
    router.put("/", productsController.update);

    // Retrieve all products
    router.get("/",productsController.getAll);
    // Delete a product with id
    router.delete("/:id", productsController.delete);

    app.use("/api/products", router);
};
