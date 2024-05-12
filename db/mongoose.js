const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bloggingapp').then((e)=>{
    console.log('connection done')
}).catch((e)=>{
    console.log(e)
});