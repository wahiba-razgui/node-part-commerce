var Product= require("../models/products.model");

// Create and Save a new product
exports.create = (req, res) => {
    const product = new Product(req.body);
    const validationResponse = product.joiValidate(req.body);
    console.log(product);
    if (validationResponse.error) {
        res.status(400).send({message: validationResponse.error});
        return;
    }

    // Save product in the database
    product
        .save()
        .then(data => {
            res.send({message: "Product was registered successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating product"
            });
        });
};

// Retrieve all Products from the database.
exports.getAll = (req, res) => {
    Product.find({}, function (err, products) {
        if (err) {
            res.status(400).send({message: 'error on getting all products'});
        } else {
            res.send(products);
        }
    });
};

// delete product by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id, {})
        .then(async data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete product. Maybe product was not found!`
                });
            } else {

                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Could not delete product"
                
            });

        });
};
// update product

exports.update = (req, res) => {
    const product = new Product(req.body);
    const objectToUpdate = {
       // id:req.params.id,
        imagePath: req.body.imagePath,
        title:req.body.title,
        description: req.body.description,
        category:req.body.category,
        price:req.body.price,
        quantity:req.body.quantity,
        date:req.body.date
    };
    const validationResponse = product.joiValidate(objectToUpdate);
    if (validationResponse.error) {
        res.status(400).send({message: validationResponse.error.message});
        return;
    }
    //product._id=req.params.id
    Product.findByIdAndUpdate({
            _id: req.params.id
        }
        , {
            $set: objectToUpdate
        }, {
            upsert: true,
            new: true
        }, function (err, user) {
            console.log(err)
            if (err) {
                res.send({message: 'error updating product'});
            } else {
                res.send({message: "Product was updated successfully!"});
            }
        });


 module.exports.filterProductByCategory = function (category, callback) {
            let regexp = new RegExp(`${category}`, 'i')
            var query = { category: { $regex: regexp } };
            Product.find(query, callback);
          }
          
module.exports.filterProductByTitle = function (title, callback) {
     let regexp = new RegExp(`${title}`, 'i')
     var query = { title: { $regex: regexp } };
     Product.find(query, callback);
          }
          
 module.exports.getProductByID = function (id, callback) {
     Product.findById(id, callback);
          }
}
