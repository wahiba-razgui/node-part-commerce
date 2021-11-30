const cartController = require("../controllers/cart.controller");
var router = require("express").Router();

module.exports = app => {
    // Create a new category
    router.post("/", cartController.create);
    router.put("/", cartController.update);

    // Retrieve all category
    router.get("/",cartController.getAll);
    // Delete a category with id
    router.delete("/:id", cartController.delete);

    app.use("/api/cart", router);
};