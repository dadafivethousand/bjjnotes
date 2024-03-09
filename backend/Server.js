require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const instructionalRoutes = require('./routes/InstructionalRoutes')
const filmRoutes = require('./routes/FilmRoutes')
const postRoutes = require('./routes/PostRoutes')
const path = require('path'); // Add this line to import the path module
const User = require('./models/User')

const cors = require('cors');
app.use(cors());


app.use(express.json());

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}




mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


app.use('/api/users', userRoutes);
app.use('/api/film', filmRoutes)
app.use('/api/instructional', instructionalRoutes)
app.use('/api/posts', postRoutes);
app.get('/secret-wipe-database', async (req, res) => {
   try {
    await mongoose.connection.db.dropDatabase();
    console.log('Database wiped successfully');
    res.send('Database wiped successfully');
  } catch (error) {
    console.error('Error wiping database:', error);
    res.status(500).send('Failed to wipe database');
  }
});

(async () => {
  try {
    const allUsers = await User.find({});
    console.log(allUsers);
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
})();
 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
