
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = Schema({
  products:  {type: Schema.Types.ObjectId, ref: 'Product'},
  totalQty: 'number',
  totalPrice:'number',
  userId: 'string'
})

cartSchema.methods.joiValidate = (tour) => {
    var Joi = require('joi');
    const schema = Joi.object({
        products: Joi.array().required(),
        totalQty:Joi.number().required(),
        totalPrice:Joi.number().required(),
        userId:Joi.string().required()


        
    });
    return schema.validate(cart)
}

 module.exports = mongoose.model('Cart', cartSchema)
