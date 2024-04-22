// username : saraasalah88
// password : nbwetaGl8b0sTK4P

const express =require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const announcmentRoute = require('./routes/announcmentsRoute')
const userRoute = require('./routes/userRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors');



const app = express();
app.set('view engine' , 'ejs')
app.use(express.static('public'))


const MONGO_URL = process.env.MONGO_URL
const Port = process.env.Port

// middle ware 
app.use(cors({ credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json())
app.use(cookieParser())
app.use('/announcment' , announcmentRoute )
app.use('/user' , userRoute )
app.use(errorMiddleware);



app.get('/getData',  (req,res) =>{
   /* res.render('index' , {userName : 'Sara'} )*/
   res.send({ "id" : "1"})
}) 



mongoose.connect(MONGO_URL)
.then(app.listen(Port , () => {
    console.log(`Iam listening on ${Port}`)
}))
.catch(err => {
console.log(err)
})


