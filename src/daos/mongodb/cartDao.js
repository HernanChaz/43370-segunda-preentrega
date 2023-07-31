import { CartModel } from "./models/cartModel.js";

export default class CartDaoMongoDB {
          
    async newCart(cart){
        try {
            const response = await CartModel.create(cart);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
        
    async getCarts(){
        try {
            const response = await CartModel.find();
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
        
    async getCartById(cartId){
        try {
            const response = await CartModel.findById(cartId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    async updateCart(cartId, prodId){
        try {
            const response = await CartModel.findOneAndUpdate(cartId, { $set: { "products.$[elem].quantity": +1 } },
                                                            { arrayFilters: [ {"elem.prodID": prodId} ] }, {new: true});
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    async deleteCart(cartId){
        try {
            const response = await CartModel.findByIdAndDelete(cartId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
}