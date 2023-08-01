import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/productController.js';

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/chat', (req, res) => {
    res.render('chat')
});

router.get('/products', async (req, res) => {
    const sa = await controller.getProds(req, res);
    const products = sa.payload;
    console.log(products);
    res.render('products', { products } );
});

export default router;