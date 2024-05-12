require('./db/mongoose')
const express = require('express');

const Blog=require('./models/blog')

const app = express();
app.use(express.json())


app.post('/blog', (req, res) => {
    // const blog=new Blog(req.body);
    // blog.save().then((blog)=>{
    //     res.status(201).send(blog);
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })

   /* Blog.create(req.body).then((blog)=>{
        res.status(201).send(blog);
    }).catch((error)=>{
        res.status(400).send(error)
    })*/

    Blog.insertMany(req.body).then((blogs)=>{
        res.status(201).send(blogs);
    }).catch((error)=>{
        res.status(400).send(error)
    })
});


app.get('/blogs',(req,res)=>{
    Blog.find({}).then((blogs)=>{

        if(!blogs){
            return res.send(404).send();
        }
        res.status(200).send(blogs);
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

app.get('/blogsss',async(req,res)=>{
    try{
        const blogs = await Blog.find({});
        if (!blogs || blogs.length === 0) {
            return res.status(404).send();
        }
        res.status(200).send(blogs);
    }catch(e){
        res.status(500).send(e);

    }
})






// app.get('/blogs/:id',(req,res)=>{
//     Blog.findById(req.params.id).then((blogs)=>{
//         res.status(200).send(blogs);
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })
// })


// app.get('/blogs/:id',(req,res)=>{
//     Blog.findOne({_id: req.params.id}).then((blogs)=>{
//         res.status(200).send(blogs);
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })
// })


app.put('/blog/:id',(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((blog)=>{
        if(!blog){
            return res.status(404).send()
        }

        res.status(200).send(blog)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})


app.delete('/blogs/:id',async(req,res)=>{
    try{
    const blog=await Blog.findByIdAndDelete(req.params.id);
    if(!blog){
        return res.status(404).send()
    }
    res.send(blog)
    }

  
catch(e){
        res.status(500).send()
    }
})



app.listen(3000, () => console.log('listening on port 3000...'));

