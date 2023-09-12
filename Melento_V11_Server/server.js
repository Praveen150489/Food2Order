const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
port=3000

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res) => {
  res.json({message: "Welcome to food to order application."});
});

require("./routers/app.routes")(app)
const server=app.listen(port,()=>
  console.log(`Server is running on port: ${port}`)
)
