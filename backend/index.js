const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes')
const readingRoutes = require('./routes/reading.routes')
const readingsRoutes = require('./routes/readings.routes')
const roleRoutes = require('./routes/role.routes')
const path = require('path');
// const __dirname = path.dirname("")
//the above supposed to be commented as the __dirname is already declared below

const buildPath = path.join(__dirname, "../frontend/build")

require('dotenv').config();
app.use(cors({ origin: '*' }))
app.use(express.json())

const mongoURI = process.env.MONGODB_URI

//last thing left is using the xl

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.use("/api/user", userRoutes);
  app.use("/api/reading",readingRoutes );
  app.use("/api/readings",readingsRoutes );
app.use("/api/role", roleRoutes)


app.use(express.static(buildPath))
app.get("/*", function(req,res){
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function(err){
      if(err){
        res.status(500).send(err)
      }
    }
  )
})
const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`App listening on port ${port}` )
})