import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize"

export const getProducts = async(req, res) =>{
    try {
        let response;
        if(req.role === 'admin'){
            response = await Products.findAll({
                attributes:['uuid','name','price'],
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            });
        } else{
            response = await Products.findAll({
                attributes:['uuid','name','price'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
    
}
export const getProductsById = async(req, res) =>{
     try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        // res.status(200).json(product);
        if(!product) return res.status(404).json({msg:"product tidak ditemukan"});

        let response;
        if(req.role === 'admin'){
            response = await Products.findOne({
                attributes:['uuid','name','price'],
                where:{
                    id: product.id
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            });
        } else{
            response = await Products.findOne({
                attributes:['uuid','name','price'],
                where:{
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}
export const createProducts = async(req, res) =>{
const {name, price} = req.body;
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId
        });
         res.status(201).json({msg: 'product created'});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}
export const updateProducts = async(req, res) =>{
    try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        // res.status(200).json(product);
        if(!product) return res.status(404).json({msg:"product tidak ditemukan"});

        const {name, price} = req.body;
        if(req.role === 'admin'){
            await Products.update({
                name: name,
                price: price
            },{
                where:{
                    id: product.id
                }
            });
        } else{
            if (req.userId !== product.userId) return res.status(403).json({msg:"akses terlarang"});
            await Products.update({
                name: name,
                price: price
            },{
                where:{
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg:"berhasil update produk"});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }

}
export const deleteProducts = async(req, res) =>{
    try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        // res.status(200).json(product);
        if(!product) return res.status(404).json({msg:"product tidak ditemukan"});

        const {name, price} = req.body;
        if(req.role === 'admin'){
            await Products.destroy({
                where:{
                    id: product.id
                }
            });
        } else{
            if (req.userId !== product.userId) return res.status(403).json({msg:"akses terlarang"});
            await Products.destroy({
                where:{
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg:"berhasil hapus produk"});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}