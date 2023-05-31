var express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
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

router.route('/addcategory').post(upload,categoryController.addCategory);
router.route('/updatecategory/:id').put(upload,categoryController.updateCategory);
router.route('/category/:id').delete(categoryController.deleteCategory);
router.route('/category').get(categoryController.getAllCategory);
router.route('/category/:id').get(categoryController.getCategoryById);
router.route('/categorybyname/:name').get(categoryController.categoryByName);
module.exports = router;