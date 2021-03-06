const { string, number } = require('joi');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  productSchema = Schema({
  imagePath:'string',
  title: 'string',
  description: 'string',
  category: 'string',
  price: 'number',
  quantity:'number',
});


productSchema.methods.joiValidate = (Product) => {
    var Joi = require('joi');
    const schema = Joi.object({
        imagePath: Joi.string(),
        title:Joi.string().required(),
        description: Joi.string(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        quantity:Joi.number(),
    });
    return schema.validate(Product)
}
 module.exports = mongoose.model('Product', productSchema);



