
const multer=require('multer')
const path=require("path")
const store = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null,path.join(__dirname,'./images'),function(err,success) { 
   
    if (err)
    {throw (err)}
   
    });
    
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        cb(null, name + '-' + Date.now(),function(err,success){
            if(err)
            {throw err}
        });
       
    }
});
const upload = multer({ storage: store }).single('file');
module.exports={upload}