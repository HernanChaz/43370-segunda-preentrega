import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/productController.js';
import * as cartController from '../controllers/cartController.js';

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/chat', (req, res) => {
    res.render('chat')
});

router.get('/carts', async (req, res) => {
    const carts = await cartController.getAllView(req, res);
    res.render('carts', { carts } );
});

router.get('/carts/:cid', async (req, res) => {
    const cart = await cartController.getByIdView(req, res);
    console.log(cart);
    res.render('cartDetails', { cart } );
});

router.get('/products', async (req, res) => {
    const sa = await controller.getProds(req, res);
    const products = sa.payload;
    //console.log(products);
    res.render('products', { products } );
});

export default router;