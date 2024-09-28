const express = require('express');
const app = express();
const port = 3000; // You can choose any port number
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());

const uri = 'mongodb+srv://shahnapshahna243:J0m4YQnDVfNfodk1@cluster0.ib81l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
async function connectToMongoDB() {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  connectToMongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
