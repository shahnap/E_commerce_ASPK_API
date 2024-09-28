const express = require('express');
const app = express();
const port = 3000; // You can choose any port number
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Schema/UserSchema');
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


// --------------------------Authentication------------------------------------------------------//

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
  
      const newUser = new User({
        username,
        password,
       
      });
  
    
      await newUser.save();
  
      res.status(200).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
     
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' }); 
        }

      
        if (user.password !== password) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        if (user.status !== 'active') {
            return res.status(403).json({ msg: 'User is not active' }); 
        }

        // Successful login
        res.status(200).json({ msg: 'Logged in successfully' }); 

      

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
