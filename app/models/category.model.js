const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const categorySchema  = Schema({
    categoryName:'string'
  
  });

  categorySchema.methods.joiValidate = (Category) => {
    var Joi = require('joi');
    const schema = Joi.object({
        
        categoryName:Joi.string().required()
    });
    return schema.validate(Category)
}


module.exports = mongoose.model('Category', categorySchema);