require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))

//routes
app.use("/user",require("./routes/usersRouter"))
app.use("/api",require("./routes/categoryRouter"))
app.use("/api",require("./routes/upload"))
app.use("/api",require("./routes/productsRouter"))




//connect to mongodb database
const URI = process.env.MONGODB_DATABASE
mongoose.connect(URI,{
    // useCreateIndex:true,
    // useFindAndModify:false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connection successfull")
}).catch((err)=>{
    console.log(err)
})

app.get("/",(req,res)=>{
    res.json({message:"hellow it is my home page"})
})

const PORT = process.env.PORT || 5000




app.listen(PORT,()=>{
    console.log(`server runnig successfull at ${PORT}`)
})

