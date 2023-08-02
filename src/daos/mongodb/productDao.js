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
        
    async getProducts(page = 1, limit = 10, query, queryValue, sortValue = null){
        try {
            const filter = {};
            const sort = {};
            if(query) filter[query] = queryValue;
            if(sort) sort.price = sortValue;
            const response = await ProductModel.paginate(filter, { page, limit, sort, lean:true });
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
      
    async getProductById(pid){
        try {
            const response = await ProductModel.findById(pid);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    async updateProduct(pid, product){
        try {
            const response = await ProductModel.findByIdAndUpdate( pid, product, {new: true} );
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    async deleteProduct(pid){
        try {
            const response = await ProductModel.findByIdAndDelete(pid);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

}