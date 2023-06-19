const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes')
const readingRoutes = require('./routes/reading.routes')
const roleRoutes = require('./routes/role.routes')

require('dotenv').config();
app.use(cors())
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
app.use("/api/role", roleRoutes)

app.listen(8000, ()=>{
    console.log('App listening on port 8000')
})