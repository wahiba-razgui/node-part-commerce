var Category = require("../models/category.model");

// Create and Save a new category
exports.create = (req, res) => {
    const  category= new Category(req.body);
    const validationResponse = category.joiValidate(req.body);
    console.log(category);
    if (validationResponse.error) {
        res.status(400).send({message: validationResponse.error});
        return;
    }

    // Save category in the database
    category
        .save()
        .then(data => {
            res.send({message: "Category was registered successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating category"
            });
        });
};

// Retrieve all categorys from the database.
exports.getAll = (req, res) => {
    Category.find({}, function (err, categorys) {
        if (err) {
            res.status(400).send({message: 'error on getting all categorys'});
        } else {
            res.send(categorys);
        }
    });
};

// delete category by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.findByIdAndRemove(id, {})
        .then(async data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete category. Maybe category was not found!`
                });
            } else {

                res.send({
                    message: "category was deleted successfully!"
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Could not delete category"
            });
        });
};
// update category

exports.update = (req, res) => {
    const category= new Category(req.body);
    const objectToUpdate = {
        categoryName:req.body.categoryName
    };
    const validationResponse = category.joiValidate(objectToUpdate);
    if (validationResponse.error) {
        res.status(400).send({message: validationResponse.error.message});
        return;
    }
    Category.findByIdAndUpdate({
            _id: req.params.id
        }
        , {
            $set: objectToUpdate
        }, {
            upsert: true,
            new: true
        }, function (err, user) {
            if (err) {
                res.send({message: 'error updating category'});
            } else {
                res.send({message: "Category was updated successfully!"});
            }
        });
    }