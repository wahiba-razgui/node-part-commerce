const categorysController = require("../controllers/category.controller");
var router = require("express").Router();

module.exports = app => {
    // Create a new category
    router.post("/", categorysController.create);
    router.put("/", categorysController.update);

    // Retrieve all category
    router.get("/",categorysController.getAll);
    // Delete a category with id
    router.delete("/:id", categorysController.delete);

    app.use("/api/categorys", router);
};