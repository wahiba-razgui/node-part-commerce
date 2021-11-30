var Cart = require("../models/cart.model");

// Create and Save a new cart
exports.create = (req, res) => {
    const  cart= new Cart(req.body);
    const validationResponse = cart.joiValidate(req.body);
    console.log(cart);
    if (validationResponse.error) {
        res.status(400).send({message: validationResponse.error});
        return;
    }

    // Save cart in the database
    category
        .save()
        .then(data => {
            res.send({message: "Cart was registered successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating cart"
            });
        });
};

// Retrieve all cart from the database.
exports.getAll = (req, res) => {
    Cart.find({}, function (err, carts) {
        if (err) {
            res.status(400).send({message: 'error on getting all carts'});
        } else {
            res.send(carts);
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