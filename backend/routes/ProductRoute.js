import express from "express";
import { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } from "../controllers/ProductController.js";
import { verifyUser } from '../middleware/AuthUser.js'

const router = express.Router();
router.get('/products', verifyUser, getProducts);
router.get('/products/:id', verifyUser, getProductsById);
router.post('/products',verifyUser, createProducts);
router.patch('/products/:id', verifyUser, updateProducts);
router.delete('/products/:id',verifyUser, deleteProducts);

export default router;