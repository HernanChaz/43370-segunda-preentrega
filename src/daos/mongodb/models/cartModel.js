import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
});

// cartSchema.pre('findById', function(){
//      this.populate('products');
// })

// cartSchema.pre('find', function(){
//     this.populate('products');
// })

export const CartModel = mongoose.model('carts', cartSchema);