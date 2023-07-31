import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMongoDB {

    async addProduct(product){
        try {
            const response = await ProductModel.create(product);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
        
    async getProducts(){
        try {
            const response = await ProductModel.find();
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
      
    async getProductById(prodId){
        try {
            const response = await ProductModel.findById(prodId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    async updateProduct(prodId, product){
        try {
            const response = await ProductModel.findByIdAndUpdate( prodId, product, {new: true} );
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    async deleteProduct(prodId){
        try {
            const response = await ProductModel.findByIdAndDelete(prodId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

}