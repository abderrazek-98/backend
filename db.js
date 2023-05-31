const mongoose=require('mongoose');
require('dotenv').config()
mongoose.set('strictQuery', false);
mongoose.connect(process.env.url_db+process.env.name_db,{useNewUrlParser: true},function verifDb(error)
{if(error){
    console.log('echec de connxion de base de donne');
}
else{
    console.log('mongoose connected to db ..  '+process.env.url_db+process.env.name_db);
}
});
