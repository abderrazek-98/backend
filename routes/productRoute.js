const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer=require('multer')
const path=require("path")

const store = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null,path.join(__dirname,"../public/images"),function(err,success) { 
   
    if (err)
    {throw (err)}
   
    });
    
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        cb(null,Date.now() + '-' + name ,function(err,success){
            if(err)
            {throw err}
        });
       
    }
});
const upload = multer({ storage: store }).single('image');
router.route('/product').get(productController.getAllProduct);
router.route('/product/:id').get(productController.getProductById);
router.route('/addProduct').post(upload,productController.addProduct);
router.route('/updateProduct/:id').put(upload,productController.updateProduct);
router.route('/product/:id').delete(productController.deleteProduct);
router.route('/productbyname/:name').get(productController.productByName);
router.route('/category/:categoryId').get(productController.getProductCategory);
router.route('/cart').post(productController.getCarts);
router.route('/allcart').get(productController.getAllCart);
router.route('/allcartconfirmer').get(productController.getAllCartConfirmer);
router.route('/cart/:id').get(productController.getCartById);
router.route('/cart/:id').delete(productController.deleteCart);
module.exports = router;